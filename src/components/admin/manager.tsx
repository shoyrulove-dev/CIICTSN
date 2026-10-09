"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Icon } from "@/components/icons";

export type AdminField = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "url" | "image" | "number" | "date" | "checkbox" | "select" | "color";
  options?: Array<string | { value: string; label: string }>;
  placeholder?: string;
  hint?: string;
  section?: string;
};

type Item = Record<string, unknown> & { _id?: string };

function ImageUploadField({
  value,
  folder,
  disabled,
  hint,
  onChange,
}: {
  value: string;
  folder: string;
  disabled: boolean;
  hint?: string;
  onChange: (value: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  async function upload(file?: File) {
    if (!file) return;
    setError("");
    setProgress(0);
    const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]);
    if (!allowedTypes.has(file.type)) {
      setError("Chỉ hỗ trợ JPG, PNG, WebP, GIF hoặc SVG.");
      return;
    }
    if (file.size === 0) {
      setError("Tệp ảnh đang trống.");
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      setError("Ảnh vượt quá giới hạn 25MB.");
      return;
    }
    setUploading(true);
    try {
      const authResponse = await fetch("/api/admin/upload", { cache: "no-store" });
      const auth = await authResponse.json();
      if (!authResponse.ok) throw new Error(auth.message || "Chưa thể tải ảnh lúc này.");

      const body = new FormData();
      body.set("file", file);
      body.set("fileName", file.name);
      body.set("folder", `ciic/${folder}`);
      body.set("useUniqueFileName", "true");
      body.set("tags", "ciic,website");
      body.set("token", String(auth.token));
      body.set("expire", String(auth.expire));
      body.set("signature", String(auth.signature));
      body.set("publicKey", String(auth.publicKey));

      const result = await new Promise<Record<string, unknown>>((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open("POST", "https://upload.imagekit.io/api/v1/files/upload");
        request.timeout = 120_000;
        request.upload.onprogress = (event) => {
          if (event.lengthComputable) setProgress(Math.round((event.loaded / event.total) * 100));
        };
        request.onerror = () => reject(new Error("Mất kết nối khi tải ảnh."));
        request.ontimeout = () => reject(new Error("Thời gian tải ảnh quá lâu. Vui lòng thử lại."));
        request.onload = () => {
          let payload: Record<string, unknown> = {};
          try {
            payload = JSON.parse(request.responseText) as Record<string, unknown>;
          } catch {
            reject(new Error("ImageKit trả về dữ liệu không hợp lệ."));
            return;
          }
          if (request.status < 200 || request.status >= 300) {
            reject(new Error(String(payload.message || "Chưa tải được ảnh.")));
            return;
          }
          resolve(payload);
        };
        request.send(body);
      });
      if (!result.url) throw new Error("ImageKit không trả về URL ảnh.");
      onChange(String(result.url));
      setProgress(100);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Chưa tải được ảnh.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="admin-image-control">
      {value ? <div className="admin-image-preview"><Image src={value} alt="" fill sizes="280px" unoptimized /></div> : null}
      <div className="admin-image-input-row">
        <input type="url" value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)} placeholder="Dán liên kết hoặc tải ảnh mới" />
        {!disabled ? (
          <label className="admin-upload-button" title="Tải ảnh mới lên kho ảnh">
            <Icon name="upload" />
            <span>{uploading ? `Đang tải ${progress}%` : "Tải ảnh"}</span>
            <input type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml" disabled={uploading} onChange={(event) => { void upload(event.target.files?.[0]); event.target.value = ""; }} />
          </label>
        ) : null}
      </div>
      <small className="admin-field-hint">{hint || "Đề xuất: ảnh JPG/WebP, tối thiểu 1200px, dung lượng dưới 5MB."}</small>
      {progress === 100 && !uploading && !error ? <small className="admin-field-success">Ảnh đã tải xong. Nhấn “Lưu thay đổi” để đưa ảnh lên website.</small> : null}
      {error ? <small className="admin-field-error">{error}</small> : null}
    </div>
  );
}

function getValue(item: Item, path: string): unknown {
  return path.split(".").reduce<unknown>((value, key) => value && typeof value === "object" ? (value as Record<string, unknown>)[key] : "", item);
}

function setValue(target: Record<string, unknown>, path: string, value: unknown) {
  const keys = path.split(".");
  let cursor = target;
  keys.forEach((key, index) => {
    if (index === keys.length - 1) cursor[key] = value;
    else {
      if (!cursor[key] || typeof cursor[key] !== "object") cursor[key] = {};
      cursor = cursor[key] as Record<string, unknown>;
    }
  });
}

export function AdminManager({
  collection,
  fields,
  initialItems,
  singleton = false,
  titleField = "title",
  readOnly = false,
}: {
  collection: string;
  fields: AdminField[];
  initialItems: Item[];
  singleton?: boolean;
  titleField?: string;
  readOnly?: boolean;
}) {
  const empty = useMemo(() => Object.fromEntries(fields.map((field) => [field.name, field.type === "checkbox" ? false : ""])), [fields]);
  const [items, setItems] = useState(initialItems);
  const [editing, setEditing] = useState<Item | null>(singleton ? initialItems[0] || empty : null);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [savingGroup, setSavingGroup] = useState("");
  const [savedGroup, setSavedGroup] = useState("");
  const [groupError, setGroupError] = useState("");
  const [dirtyGroups, setDirtyGroups] = useState<Set<string>>(new Set());
  const [deletingId, setDeletingId] = useState("");
  const fieldGroups = useMemo(() => {
    const groups: Array<{ name: string; fields: AdminField[] }> = [];
    fields.forEach((field) => {
      const name = field.section || "";
      const current = groups.find((group) => group.name === name);
      if (current) current.fields.push(field);
      else groups.push({ name, fields: [field] });
    });
    return groups;
  }, [fields]);

  async function save(fieldsToSave = fields, groupName = "") {
    if (!editing) return;
    if (groupName) {
      setSavingGroup(groupName);
      setSavedGroup("");
      setGroupError("");
    } else setSaving(true);
    setMessage("");
    const payload: Record<string, unknown> = {};
    fieldsToSave.forEach((field) => setValue(payload, field.name, getValue(editing, field.name)));
    const url = editing._id ? `/api/admin/${collection}/${editing._id}` : `/api/admin/${collection}`;
    try {
      const response = await fetch(url, { method: editing._id ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Không thể lưu thay đổi.");
      const savedItem = result.item as Item;
      setItems((current) => {
        const exists = current.some((item) => item._id === savedItem._id);
        return exists ? current.map((item) => item._id === savedItem._id ? savedItem : item) : [savedItem, ...current];
      });
      setMessage(result.message || "Đã lưu thay đổi.");
      if (singleton && groupName) {
        setEditing((current) => {
          const next = structuredClone(current || empty) as Item;
          next._id = savedItem._id;
          fieldsToSave.forEach((field) => setValue(next, field.name, getValue(savedItem, field.name)));
          return next;
        });
        setDirtyGroups((current) => {
          const next = new Set(current);
          next.delete(groupName);
          return next;
        });
        setSavedGroup(groupName);
      } else if (singleton) setEditing(savedItem);
      else setEditing(null);
    } catch (saveError) {
      if (groupName) setGroupError(groupName);
      setMessage(saveError instanceof Error ? saveError.message : "Không thể lưu thay đổi.");
    } finally {
      if (groupName) setSavingGroup("");
      else setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Xóa mục này? Thao tác không thể hoàn tác.")) return;
    setDeletingId(id);
    setMessage("");
    try {
      const response = await fetch(`/api/admin/${collection}/${id}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Không thể xóa mục này.");
      setItems((current) => current.filter((item) => item._id !== id));
      setMessage(result.message || "Đã xóa.");
    } catch (deleteError) {
      setMessage(deleteError instanceof Error ? deleteError.message : "Không thể xóa mục này.");
    } finally {
      setDeletingId("");
    }
  }

  function change(path: string, value: unknown) {
    const groupName = fields.find((field) => field.name === path)?.section || "";
    if (groupName) {
      setDirtyGroups((current) => new Set(current).add(groupName));
      if (savedGroup === groupName) setSavedGroup("");
      if (groupError === groupName) setGroupError("");
    }
    setEditing((current) => {
      const next = structuredClone(current || empty) as Item;
      setValue(next, path, value);
      return next;
    });
  }

  function groupStatus(groupName: string) {
    if (savingGroup === groupName) return <span className="admin-action-status saving"><i />Đang lưu</span>;
    if (groupError === groupName) return <span className="admin-action-status error">Lưu chưa thành công</span>;
    if (dirtyGroups.has(groupName)) return <span className="admin-action-status changed">Có thay đổi chưa lưu</span>;
    if (savedGroup === groupName) return <span className="admin-action-status success">Đã lưu</span>;
    return <span className="admin-action-status">Chưa có thay đổi</span>;
  }

  function renderField(field: AdminField) {
    const value = getValue(editing || empty, field.name);
    return <label className={field.type === "textarea" ? "full" : ""} key={field.name}><span>{field.label}</span>
      {field.type === "textarea" ? <textarea rows={5} value={String(value || "")} disabled={readOnly} onChange={(e) => change(field.name, e.target.value)} placeholder={field.placeholder} /> :
        field.type === "image" ? <ImageUploadField value={String(value || "")} folder={collection} disabled={readOnly} hint={field.hint} onChange={(nextValue) => change(field.name, nextValue)} /> :
        field.type === "select" ? <select value={String(value || "")} disabled={readOnly} onChange={(e) => change(field.name, e.target.value)}>{field.options?.map((option) => {const item=typeof option==="string"?{value:option,label:option}:option;return <option value={item.value} key={item.value}>{item.label}</option>})}</select> :
        field.type === "checkbox" ? <input className="admin-checkbox" type="checkbox" checked={Boolean(value)} disabled={readOnly} onChange={(e) => change(field.name, e.target.checked)} /> :
        <input type={field.type || "text"} value={String(value ?? "")} disabled={readOnly} onChange={(e) => change(field.name, field.type === "number" ? Number(e.target.value) : e.target.value)} placeholder={field.placeholder} />}
      {field.hint && field.type !== "image" ? <small className="admin-field-hint">{field.hint}</small> : null}
    </label>;
  }

  return (
    <div className="admin-manager">
      <div className="admin-toolbar">
        <span>{items.length} nội dung</span>
        {!singleton && !readOnly ? <button type="button" className="admin-primary" onClick={() => { setMessage(""); setEditing({ ...empty }); }}><Icon name="plus" />Thêm mới</button> : null}
      </div>
      {message ? <div className="admin-message">{message}</div> : null}
      {!singleton ? (
        <div className="admin-table-wrap"><table className="admin-table">
          <thead><tr><th>Nội dung</th><th>Trạng thái</th><th>Cập nhật</th></tr></thead>
          <tbody>{items.map((item, index) => <tr key={item._id || index}>
            <td><b>{String(getValue(item, titleField) || getValue(item, "name") || `Mục ${index + 1}`)}</b><small>{String(getValue(item, fields[1]?.name || "") || "")}</small></td>
            <td><span className="admin-status">{String(getValue(item, "status") || (getValue(item, "published") === false ? "Ẩn" : "Đang hiển thị"))}</span></td>
            <td><div className="admin-actions">
              <button type="button" className="admin-icon-button" title={readOnly ? "Xem chi tiết" : "Xem và chỉnh sửa"} aria-label={readOnly ? "Xem chi tiết" : "Xem và chỉnh sửa"} onClick={() => { setMessage(""); setEditing(structuredClone(item)); }}><Icon name="edit" /></button>
              {!readOnly && item._id ? <button type="button" className={`admin-icon-button danger${deletingId === item._id ? " is-loading" : ""}`} title="Xóa" aria-label="Xóa" aria-busy={deletingId === item._id} disabled={Boolean(deletingId)} onClick={() => remove(item._id!)}>{deletingId === item._id ? <span className="admin-button-spinner" /> : <Icon name="trash" />}</button> : null}
            </div></td>
          </tr>)}</tbody>
        </table></div>
      ) : null}
      {editing ? (
        <div className={singleton ? "admin-editor inline" : "admin-modal-backdrop"}>
          <section className={singleton ? "" : "admin-editor"}>
            <div className="admin-editor-head"><div><b>{readOnly ? "Chi tiết" : editing._id ? "Chỉnh sửa" : "Thêm mới"}</b><span>Nội dung CIIC</span></div>{!singleton ? <button type="button" title="Đóng" aria-label="Đóng" onClick={() => setEditing(null)}><Icon name="close" /></button> : null}</div>
            <div className={fieldGroups.some((group) => group.name) ? "admin-form-sections" : ""}>
              {fieldGroups.map((group) => group.name ? (
                <details className="admin-form-section" key={group.name}>
                  <summary><span>{group.name}</span><small>{group.fields.length} mục</small></summary>
                  <div className="admin-form-grid">{group.fields.map(renderField)}</div>
                  {!readOnly ? <div className="admin-section-actions">
                    {groupStatus(group.name)}
                    <button type="button" className={`admin-primary${savingGroup === group.name ? " is-loading" : ""}`} aria-busy={savingGroup === group.name} disabled={Boolean(savingGroup)} onClick={() => save(group.fields, group.name)}>{savingGroup === group.name ? <span className="admin-button-spinner" /> : <Icon name="save" />}{savingGroup === group.name ? "Đang lưu..." : "Lưu nhóm này"}</button>
                  </div> : null}
                </details>
              ) : <div className="admin-form-grid" key="default">{group.fields.map(renderField)}</div>)}
            </div>
            {(!singleton || !fieldGroups.some((group) => group.name)) ? <div className="admin-editor-actions">{!readOnly ? <><span className={`admin-action-status${saving ? " saving" : ""}`}>{saving ? <><i />Đang lưu</> : "Sẵn sàng lưu"}</span><button type="button" className={`admin-primary${saving ? " is-loading" : ""}`} aria-busy={saving} disabled={saving} onClick={() => save()}>{saving ? <span className="admin-button-spinner" /> : <Icon name="save" />}{saving ? "Đang lưu..." : "Lưu thay đổi"}</button></> : null}{!singleton ? <button type="button" disabled={saving} onClick={() => setEditing(null)}>Đóng</button> : null}</div> : null}
          </section>
        </div>
      ) : null}
    </div>
  );
}

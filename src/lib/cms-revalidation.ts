import { revalidatePath, updateTag } from "next/cache";
import type { CollectionName } from "@/lib/admin";

type CmsItem = { slug?: unknown } | null | undefined;

function slugOf(item: CmsItem) {
  return typeof item?.slug === "string" ? item.slug : "";
}

export function revalidateCmsCollection(collection: CollectionName, item?: CmsItem, previousItem?: CmsItem) {
  updateTag(`cms-${collection}`);
  updateTag("admin-counts");
  if (collection === "settings") {
    revalidatePath("/", "layout");
    return;
  }

  if (collection === "services") {
    revalidatePath("/");
    revalidatePath("/dich-vu");
    revalidatePath("/sitemap.xml");
    revalidatePath("/admin/services");
    const slugs = new Set([slugOf(item), slugOf(previousItem)].filter(Boolean));
    slugs.forEach((slug) => {
      revalidatePath(`/${slug}`);
      revalidatePath(`/dich-vu/${slug}`);
    });
    return;
  }

  if (collection === "posts") {
    revalidatePath("/");
    revalidatePath("/kien-thuc");
    revalidatePath("/sitemap.xml");
    revalidatePath("/admin/posts");
    const slugs = new Set([slugOf(item), slugOf(previousItem)].filter(Boolean));
    slugs.forEach((slug) => {
      revalidatePath(`/${slug}`);
      revalidatePath(`/kien-thuc/${slug}`);
    });
    return;
  }

  if (collection === "gallery" || collection === "videos") {
    revalidatePath("/lien-he");
    revalidatePath("/thu-vien");
    revalidatePath("/dich-vu");
    revalidatePath(collection === "gallery" ? "/admin/gallery" : "/admin/videos");
    return;
  }

  if (collection === "doctors") {
    revalidatePath("/gioi-thieu");
    revalidatePath("/admin/doctors");
    return;
  }

  if (collection === "appointments") {
    revalidatePath("/admin");
    revalidatePath("/admin/appointments");
  }
  if (collection === "roadmap") {
    revalidatePath("/");
    revalidatePath("/kham-pha/[slug]", "page");
    revalidatePath("/sitemap.xml");
    revalidatePath("/admin/roadmap");
  }
}

import { Icon } from "@/components/icons";
import type { SiteSettings } from "@/types/cms";

export function FloatingActions({ settings }: { settings: SiteSettings }) {
  return (
    <div className="floating-actions">
      <a className="float-facebook" href={settings.contact.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Icon name="facebook" /></a>
      <a className="float-zalo" href={settings.contact.zalo} target="_blank" rel="noreferrer" aria-label="Zalo">Zalo</a>
      <a className="float-phone" href={`tel:${settings.contact.phone.replace(/\s/g, "")}`} aria-label={`Gọi ${settings.contact.phone}`}><Icon name="phone" /></a>
    </div>
  );
}


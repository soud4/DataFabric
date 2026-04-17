import { useState, useMemo } from "react"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface PlanCalculatorProps {
  serviceType: "vps" | "cloud-storage" | "hosting" | "dedicated" | "cloud-computing"
}

const pricingConfig = {
  vps: {
    baseName: "VPS",
    vcpu: { min: 1, max: 16, step: 1, pricePerUnit: 5 },
    ram: { min: 1, max: 64, step: 1, pricePerUnit: 3, unit: "GB" },
    storage: { min: 20, max: 2000, step: 20, pricePerUnit: 0.05, unit: "GB" },
    nvmePrice: 8,
    backupDailyPrice: 5,
    backupContinuousPrice: 15,
    managedPrice: 20,
    ddosPrice: 10,
  },
  "cloud-storage": {
    baseName: "Cloud Storage",
    vcpu: null,
    ram: null,
    storage: { min: 50, max: 10000, step: 50, pricePerUnit: 0.02, unit: "GB" },
    nvmePrice: 0,
    backupDailyPrice: 3,
    backupContinuousPrice: 10,
    managedPrice: 0,
    ddosPrice: 0,
  },
  hosting: {
    baseName: "Hosting",
    vcpu: { min: 1, max: 8, step: 1, pricePerUnit: 4 },
    ram: { min: 1, max: 16, step: 1, pricePerUnit: 2.5, unit: "GB" },
    storage: { min: 10, max: 500, step: 10, pricePerUnit: 0.06, unit: "GB" },
    nvmePrice: 5,
    backupDailyPrice: 3,
    backupContinuousPrice: 8,
    managedPrice: 15,
    ddosPrice: 5,
  },
  dedicated: {
    baseName: "Servidor Dedicado",
    vcpu: { min: 4, max: 64, step: 4, pricePerUnit: 8 },
    ram: { min: 8, max: 512, step: 8, pricePerUnit: 2, unit: "GB" },
    storage: { min: 240, max: 8000, step: 240, pricePerUnit: 0.03, unit: "GB" },
    nvmePrice: 20,
    backupDailyPrice: 10,
    backupContinuousPrice: 25,
    managedPrice: 50,
    ddosPrice: 15,
  },
  "cloud-computing": {
    baseName: "Cloud Compute",
    vcpu: { min: 1, max: 32, step: 1, pricePerUnit: 6 },
    ram: { min: 1, max: 128, step: 1, pricePerUnit: 3.5, unit: "GB" },
    storage: { min: 20, max: 4000, step: 20, pricePerUnit: 0.04, unit: "GB" },
    nvmePrice: 10,
    backupDailyPrice: 5,
    backupContinuousPrice: 15,
    managedPrice: 30,
    ddosPrice: 10,
  },
}

export default function PlanCalculator({ serviceType }: PlanCalculatorProps) {
  const config = pricingConfig[serviceType]

  const [vcpus, setVcpus] = useState(config.vcpu ? config.vcpu.min * 2 : 0)
  const [ram, setRam] = useState(config.ram ? config.ram.min * 4 : 0)
  const [storage, setStorage] = useState(config.storage.min * 4)
  const [nvme, setNvme] = useState(true)
  const [backups, setBackups] = useState<"none" | "daily" | "continuous">("daily")
  const [managed, setManaged] = useState(false)
  const [ddos, setDdos] = useState(true)

  const totalPrice = useMemo(() => {
    let price = 0

    if (config.vcpu) price += vcpus * config.vcpu.pricePerUnit
    if (config.ram) price += ram * config.ram.pricePerUnit
    price += storage * config.storage.pricePerUnit

    if (nvme && config.nvmePrice) price += config.nvmePrice
    if (backups === "daily") price += config.backupDailyPrice
    if (backups === "continuous") price += config.backupContinuousPrice
    if (managed && config.managedPrice) price += config.managedPrice
    if (ddos && config.ddosPrice) price += config.ddosPrice

    return Math.round(price * 100) / 100
  }, [vcpus, ram, storage, nvme, backups, managed, ddos, config])

  return (
    <section id="calculadora" className="py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Configurador de plan
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Arma tu plan a medida
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Ajusta los recursos y ve el precio en tiempo real. Sin letra chica.
          </p>
        </div>

        <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-xl shadow-primary/5 sm:p-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
            {/* Sliders */}
            <div className="flex flex-col gap-8">
              {/* vCPUs */}
              {config.vcpu && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">vCPUs</Label>
                    <span className="rounded-md bg-muted px-2.5 py-1 text-sm font-bold tabular-nums">
                      {vcpus} cores
                    </span>
                  </div>
                  <Slider
                    min={config.vcpu.min}
                    max={config.vcpu.max}
                    step={config.vcpu.step}
                    value={[vcpus]}
                    onValueChange={(v) => setVcpus(v[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{config.vcpu.min} core</span>
                    <span>{config.vcpu.max} cores</span>
                  </div>
                </div>
              )}

              {/* RAM */}
              {config.ram && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Memoria RAM</Label>
                    <span className="rounded-md bg-muted px-2.5 py-1 text-sm font-bold tabular-nums">
                      {ram} {config.ram.unit}
                    </span>
                  </div>
                  <Slider
                    min={config.ram.min}
                    max={config.ram.max}
                    step={config.ram.step}
                    value={[ram]}
                    onValueChange={(v) => setRam(v[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{config.ram.min} {config.ram.unit}</span>
                    <span>{config.ram.max} {config.ram.unit}</span>
                  </div>
                </div>
              )}

              {/* Storage */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Almacenamiento</Label>
                  <span className="rounded-md bg-muted px-2.5 py-1 text-sm font-bold tabular-nums">
                    {storage >= 1000 ? `${(storage / 1000).toFixed(1)} TB` : `${storage} GB`}
                  </span>
                </div>
                <Slider
                  min={config.storage.min}
                  max={config.storage.max}
                  step={config.storage.step}
                  value={[storage]}
                  onValueChange={(v) => setStorage(v[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{config.storage.min} {config.storage.unit}</span>
                  <span>
                    {config.storage.max >= 1000
                      ? `${(config.storage.max / 1000).toFixed(0)} TB`
                      : `${config.storage.max} GB`}
                  </span>
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-4 border-t border-border/50 pt-6">
                <h3 className="text-sm font-semibold">Opciones adicionales</h3>

                {config.nvmePrice > 0 && (
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm">Discos NVMe</Label>
                      <p className="text-xs text-muted-foreground">Hasta 7x más rápido que SSD SATA</p>
                    </div>
                    <Switch checked={nvme} onCheckedChange={setNvme} />
                  </div>
                )}

                {/* Backup selection */}
                <div className="space-y-2">
                  <Label className="text-sm">Backups</Label>
                  <div className="flex flex-wrap gap-2">
                    {(["none", "daily", "continuous"] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setBackups(opt)}
                        className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                          backups === opt
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-muted-foreground hover:border-border hover:text-foreground"
                        }`}
                      >
                        {opt === "none" ? "Sin backups" : opt === "daily" ? "Diarios" : "Continuos"}
                        {opt !== "none" && (
                          <span className="ml-1 text-muted-foreground">
                            +${opt === "daily" ? config.backupDailyPrice : config.backupContinuousPrice}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {config.managedPrice > 0 && (
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm">Servidor administrado</Label>
                      <p className="text-xs text-muted-foreground">
                        Nuestro equipo gestiona parches, actualizaciones y monitoreo
                      </p>
                    </div>
                    <Switch checked={managed} onCheckedChange={setManaged} />
                  </div>
                )}

                {config.ddosPrice > 0 && (
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm">Protección anti-DDoS</Label>
                      <p className="text-xs text-muted-foreground">Mitigación automática en capa 3/4/7</p>
                    </div>
                    <Switch checked={ddos} onCheckedChange={setDdos} />
                  </div>
                )}
              </div>
            </div>

            {/* Price summary (sticky on desktop) */}
            <div className="lg:sticky lg:top-24">
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
                <p className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Tu plan personalizado
                </p>
                <div className="mb-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight text-primary">
                    ${totalPrice.toFixed(2)}
                  </span>
                  <span className="text-sm text-muted-foreground">/mes</span>
                </div>

                {/* Summary */}
                <div className="mb-6 space-y-2 text-xs text-muted-foreground">
                  {config.vcpu && (
                    <div className="flex justify-between">
                      <span>{vcpus} vCPUs</span>
                      <span>${(vcpus * config.vcpu.pricePerUnit).toFixed(2)}</span>
                    </div>
                  )}
                  {config.ram && (
                    <div className="flex justify-between">
                      <span>{ram} GB RAM</span>
                      <span>${(ram * config.ram.pricePerUnit).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>{storage} GB Storage</span>
                    <span>${(storage * config.storage.pricePerUnit).toFixed(2)}</span>
                  </div>
                  {nvme && config.nvmePrice > 0 && (
                    <div className="flex justify-between">
                      <span>NVMe</span>
                      <span>+${config.nvmePrice}</span>
                    </div>
                  )}
                  {backups !== "none" && (
                    <div className="flex justify-between">
                      <span>Backups {backups === "daily" ? "diarios" : "continuos"}</span>
                      <span>
                        +$
                        {backups === "daily"
                          ? config.backupDailyPrice
                          : config.backupContinuousPrice}
                      </span>
                    </div>
                  )}
                  {managed && config.managedPrice > 0 && (
                    <div className="flex justify-between">
                      <span>Administrado</span>
                      <span>+${config.managedPrice}</span>
                    </div>
                  )}
                  {ddos && config.ddosPrice > 0 && (
                    <div className="flex justify-between">
                      <span>Anti-DDoS</span>
                      <span>+${config.ddosPrice}</span>
                    </div>
                  )}
                  <div className="border-t border-border/50 pt-2 font-semibold text-foreground">
                    <div className="flex justify-between">
                      <span>Total mensual</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <a
                  href="#contacto"
                  className="mb-3 flex h-10 w-full items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
                >
                  Contratar este plan
                </a>
                <p className="text-center text-[10px] text-muted-foreground">
                  Sin permanencia · Cancela cuando quieras
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

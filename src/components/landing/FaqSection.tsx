import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "¿Cómo funciona el proceso de migración?",
    answer:
      "Nuestro equipo de ingenieros se encarga de migrar tus datos, bases de datos y configuraciones de servidores sin costo adicional. Planificamos la migración para minimizar el downtime (típicamente menos de 15 minutos) y realizamos pruebas exhaustivas antes del cutover. Soportamos migraciones desde AWS, GCP, Azure, DigitalOcean y cualquier otro proveedor.",
  },
  {
    question: "¿Hay permanencia mínima o contratos a largo plazo?",
    answer:
      "No. Todos nuestros planes son mes a mes, sin permanencia mínima ni penalización por cancelación. Puedes escalar, cambiar de plan o cancelar en cualquier momento desde tu panel de control. También ofrecemos descuentos de hasta 20% en planes anuales prepagados.",
  },
  {
    question: "¿Qué nivel de soporte técnico ofrecen?",
    answer:
      "Ofrecemos soporte 24/7 en todos los planes. El plan Básico incluye soporte por email con respuesta en menos de 4 horas. El plan Profesional incluye soporte prioritario por chat y teléfono con respuesta en menos de 30 minutos. El plan Enterprise incluye un ingeniero dedicado y SLA con tiempos de respuesta garantizados.",
  },
  {
    question: "¿Qué medidas de seguridad implementan?",
    answer:
      "Implementamos múltiples capas de seguridad: cifrado AES-256 en reposo y TLS 1.3 en tránsito, firewall perimetral con reglas personalizables, protección anti-DDoS con mitigación automática, WAF (Web Application Firewall) en planes Enterprise, autenticación de dos factores para el panel de control, y auditorías de seguridad periódicas.",
  },
  {
    question: "¿Puedo escalar recursos sin downtime?",
    answer:
      "Sí. El escalado vertical (más CPU, RAM o almacenamiento) se aplica en caliente en la mayoría de los casos, sin necesidad de reiniciar tu servidor. El escalado horizontal (agregar más servidores) se realiza en minutos a través del panel de control o la API. Nuestro load balancer distribuye el tráfico automáticamente.",
  },
  {
    question: "¿Qué garantía de uptime ofrecen?",
    answer:
      "Garantizamos un SLA de 99.9% de uptime en todos nuestros planes. Esto equivale a menos de 8.7 horas de downtime al año. Nuestra infraestructura cuenta con redundancia en energía, red y almacenamiento. En caso de incumplimiento del SLA, aplicamos créditos automáticos en tu próxima factura.",
  },
]

export default function FaqSection() {
  return (
    <section id="faq" className="py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-border/50 bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
            Preguntas frecuentes
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Resolvemos tus dudas
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Todo lo que necesitas saber antes de elegir DataFabric como tu
            proveedor de infraestructura.
          </p>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="border-border/50">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="px-4 py-4 text-sm font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4">
                <p className="text-muted-foreground">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

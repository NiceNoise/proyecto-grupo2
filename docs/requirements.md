# Documentación del Proyecto: Automatización de Mensajes Predeterminados en WhatsApp

Este documento describe el análisis, alcance, diseño y estructura del proyecto para automatizar el envío de mensajes predeterminados en WhatsApp para la empresa Repensar.

---

## a) Analizar el problema

### Descripción del negocio

Repensar es una empresa que ofrece cursos y programas educativos a través de campañas publicitarias en Meta Ads. Los leads generados son contactados principalmente a través de WhatsApp, donde se brinda información personalizada sobre los programas ofrecidos.

### Dolor actual (pain point)

- Gestión manual de leads: Los mensajes se envían manualmente, lo que consume tiempo y genera respuestas inconsistentes.
- Falta de personalización: No hay un sistema para enviar mensajes predeterminados adaptados a las necesidades de cada lead.
- Seguimiento desorganizado: No existe un registro centralizado de las interacciones, lo que dificulta el seguimiento y la medición de resultados.
- Tiempo de respuesta lento: Los leads no reciben respuestas inmediatas, lo que puede reducir las tasas de conversión.

### Beneficios esperados

- Reducción del tiempo de respuesta: Enviar mensajes predeterminados de manera automática para responder rápidamente a los leads.
- Personalización: Utilizar plantillas de mensajes adaptadas a diferentes etapas del funnel (bienvenida, seguimiento, cierre).
- Seguimiento organizado: Registrar automáticamente las interacciones y estados de los leads para mejorar la coordinación del equipo.
- Mejora en la conversión: Aumentar las tasas de conversión al ofrecer una experiencia más profesional y ágil.

---

## b) Definir el alcance

### Funcionalidades core

1. Tabla de usuarios:
   - Almacenar información de leads (nombre, apellido, correo opcional y número de WhatsApp).
   - Cargar usuarios por lotes desde un archivo CSV.
2. Integración con WhatsApp:
   - Abrir WhatsApp al hacer clic en un usuario de la lista.
   - Configurar plantillas de mensajes predeterminados para diferentes etapas del funnel.
3. Registro y seguimiento:
   - Registrar automáticamente los mensajes enviados.
   - Etiquetar usuarios según su etapa en el funnel (nuevo, contactado, en seguimiento, cerrado).
   - Etiquetar usuarios según el curso de interés.
4. Estadísticas y reportes:
   - Página de estadísticas para visualizar métricas clave (mensajes enviados, respuestas recibidas, conversiones).

### Restricciones técnicas

- La solución debe funcionar en WhatsApp Web (desktop) y WhatsApp para móviles.
- Debe ser compatible con la carga de hasta 220 leads por semana.
- No se requieren integraciones complejas con Meta Ads, pero debe ser escalable para futuras integraciones.

### Entregables mínimos

- Prototipo funcional con integración básica de WhatsApp.
- Tabla de usuarios con carga desde CSV.
- Plantillas de mensajes predeterminados configurables.
- Página de estadísticas básica.

---

## c) Wireframes y bocetos

### Mapa del sitio
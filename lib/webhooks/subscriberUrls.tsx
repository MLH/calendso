import { Webhook, WebhookTriggerEvents } from "@prisma/client";

import prisma from "@lib/prisma";

const getSubscriberUrls = async (
  userId: number,
  eventTypeId: number,
  triggerEvent: WebhookTriggerEvents
): Promise<string[]> => {
  const allWebhooks = await prisma.webhook.findMany({
    where: {
      userId: userId,
    },
  });

  const webhookEventTypes = await prisma.webhookEventTypes.findMany({
    where: {
      eventTypeId: eventTypeId,
    },
  });

  const filteredWebhooks = allWebhooks.filter((webhook: Webhook) => {
    return (
      webhook.eventTriggers.includes(triggerEvent) &&
      webhook.active &&
      webhookEventTypes
        .map((webhookEventType) => {
          return webhookEventType.webhookId;
        })
        .includes(webhook.id)
    );
  });

  const subscriberUrls = filteredWebhooks.map((webhook: Webhook) => {
    return webhook.subscriberUrl;
  });

  return subscriberUrls;
};

export default getSubscriberUrls;

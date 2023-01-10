import client from "pusher-js";
import { useEffect } from "react";

export interface PusherPresenceArgs {
  userId: string;
  clientId: string;
  endpoint: string;
  transport: "ajax" | "jsonp";
  cluster: string;
  name: string;
}

export const usePusherPresence = ({
  userId,
  clientId,
  endpoint,
  transport,
  cluster,
  name,
}: PusherPresenceArgs) => {
  useEffect(() => {
    const pusherClient = new client(clientId, {
      cluster,
      channelAuthorization: {
        transport,
        endpoint,
        params: {
          user_id: userId,
        },
      },
    });

    pusherClient.subscribe("presence-" + name);
  }, []);
};

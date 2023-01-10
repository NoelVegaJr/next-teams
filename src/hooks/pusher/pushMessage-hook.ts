import { useEffect, useState } from "react";
import client from "pusher-js";

class Node<T> {
  public next: Node<T> | null = null;
  constructor(public data: T) {}
}

interface ILinkedList<T> {
  push(data: T): Node<T>;
  pop(): Node<T> | null;
}

class LinkedList<T> implements ILinkedList<T> {
  public head: Node<T> | null = null;
  private tail: Node<T> | null = null;

  public push(data: T): Node<T> {
    const node = new Node(data);
    this.tail = node;

    if (!this.head) {
      this.head = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    return node;
  }

  public pop(): Node<T> | null {
    if (!this.head) {
      return null;
    }
    const node = this.head;

    this.head = this.head.next;
    return node;
  }
}

interface PusherEventArgs {
  profileId: string;
  subscription: string;
  event: string;
  transport: pusherTransport;
  endpoint: string;
  clientId: string;
  cluster: pusherCluster;
}

type pusherCluster =
  | "mt1"
  | "us2"
  | "us3"
  | "eu"
  | "ap1"
  | "ap2"
  | "ap3"
  | "ap4"
  | "sa1";
type pusherTransport = "ajax" | "jsonp";

export function usePusherEvent<Type>({
  clientId,
  endpoint,
  subscription,
  event,
  profileId,
  transport,
  cluster,
}: PusherEventArgs) {
  const [queue, setQueue] = useState<Type[]>([]);
  // const linkedList = new LinkedList<Type>();
  useEffect(() => {
    const pusherClient = new client(clientId, {
      cluster,
      channelAuthorization: {
        transport,
        endpoint,
        params: {
          user_id: profileId,
        },
      },
    });
    const channel = pusherClient.subscribe(subscription);

    channel.bind(event, (data: Type) => {
      setQueue((prev) => [...prev, data]);
      // console.log("channel recieved", data);
      // linkedList.push(data);
      // console.log(linkedList);
    });

    return () => {
      pusherClient.unsubscribe(subscription);
    };
  }, [clientId, subscription, event, transport, cluster, endpoint, profileId]);

  return queue;
}

import type { Status, Profile, FriendShipStatus } from "@prisma/client";
export type Size = "xs" | "sm" | "md" | "lg" | "xl";

export interface IUser {
  id: string;
  name: string | null;
  username: string | null;
  image: string | null;
  status: Status;
}

export interface IConversationParticipant {
  id: string;
  profile: Profile;
}

export interface IMessage {
  id: string;
  conversationId: string;
  date: Date;
  text: string;
  participant: IConversationParticipant;
}

export interface IConversationWithMessages {
  id: string;
  participants: IConversationParticipant[];
  messages: IMessage[];
}

export interface IConversationWithParticipant {
  id: string;
  participants: IConversationParticipant[];
  messages: IMessage[];
}

export interface Friend {
  friendProfile: Profile;
  status: FriendShipStatus;
}

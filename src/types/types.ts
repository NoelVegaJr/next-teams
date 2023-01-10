import type {
  Status,
  Profile,
  FriendShipStatus,
  WorkspaceChannelMember,
  WorkspaceChannel,
  Workspace,
} from "@prisma/client";
export type Size = "xs" | "sm" | "md" | "lg" | "xl";

export interface ConversationParticipant {
  id: string;
  profile: Profile;
}

export interface MessageAndParticipant {
  id: string;
  conversationId: string;
  date: Date;
  text: string;
  participant: ConversationParticipant;
}

export interface ConversationWithParticipants {
  id: string;
  participants: ConversationParticipant[];
  messages: MessageAndParticipant[];
}

export interface Friend {
  friendProfile: Profile;
  status: FriendShipStatus;
}

export interface ServerPreview {
  id: string;
  name: string;
  image: string;
  _count: {
    members: number;
  };
}

export interface IChannelMember {
  id: string;
  channelId: string;
  joinAt: Date;
  profileId: string;
  profile: Profile;
}

export interface IChannel {
  _count: {
    members: number;
  };
  createdAt: Date;
  id: string;
  name: string;
  workspaceId: string;
}

export interface IWorkspace {
  _count: {
    channels: number;
    members: number;
  };
  createdAt: Date;
  id: string;
  image: string;
  name: string;
  serverId: string;
  channels: IChannel[];
}

export interface IServer {
  id: string;
  createdAt: Date;
  name: string;
  image: string;
  _count: {
    members: number;
    workspaces: number;
  };
  workspaces: IWorkspace[];
}

export interface ActiveWorkspace extends Workspace {
  channels: WorkspaceChannel[];
}

export interface WorkspaceChannelMemberAndChannel
  extends WorkspaceChannelMember {
  channel: WorkspaceChannel;
}

export interface ServerProfile extends Profile {
  workspaceMemberships: {
    workspace: Workspace & {
      channels: WorkspaceChannel[];
    };
  }[];
  channelMemberships: WorkspaceChannelMemberAndChannel[];
}

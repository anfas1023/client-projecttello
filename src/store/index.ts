import { create } from "zustand";

export type UserType = {
  id: string | null;
  username: string;
  email: string;
  phonenumber: string;
  imageUrl: string;
};

const defaultUser: UserType = {
  id: null,
  username: " ",
  email: " ",
  phonenumber: " ",
  imageUrl: "",
};

type BearerState = {
  config: UserType;
  setUsername: (name: string) => void;
  setEmail: (email: string) => void;
  setPhoneNumber: (phonenumber: string) => void;
  setuserId: (id: string) => void;
  setImageUrl: (imageUrl: string) => void;
};

type WorkspaceType = {
  workspaceId: string;
  workspacename: string;
  description?: string;
  userId: string;
};

type WorkspaceState = {
  workspaces: WorkspaceType[];
  setWorkspaceName: (name: string) => void;
  setDescription: (description: string) => void;
  setUserId: (userId: string) => void;
  addWorkspace: (workspace: WorkspaceType) => void;
  updateWorkspace: (updatedWorkspace: WorkspaceType) => void;
  deleteWorkspace: (workspaceId: string) => void;
};

export const WorkspaceStore = create<WorkspaceState>((set) => ({
  workspaces: [],
  addWorkspace: (workspace: WorkspaceType) => {
    set((state) => {
      if (
        state.workspaces.some(
          (ws) => ws.workspacename === workspace.workspacename
        )
      ) {
        return state;
      }
      return {
        workspaces: [...state.workspaces, workspace],
      };
    });
  },
  setWorkspaceName: (name: string) => {
    set((state) => ({
      workspaces: state.workspaces.map((workspace) => ({
        ...workspace,
        workspacename: name,
      })),
    }));
  },
  setDescription: (description: string) => {
    set((state) => ({
      workspaces: state.workspaces.map((workspace) => ({
        ...workspace,
        description: description,
      })),
    }));
  },
  setUserId: (userId: string) => {
    set((state) => ({
      workspaces: state.workspaces.map((workspace) => ({
        ...workspace,
        userId: userId,
      })),
    }));
  },
  updateWorkspace: (updatedWorkspace: WorkspaceType) =>
    set((state) => ({
      workspaces: state.workspaces.map((workspace) =>
        workspace.workspaceId === updatedWorkspace.workspaceId
          ? updatedWorkspace
          : workspace
      ),
    })),
  deleteWorkspace: (workspaceId: string) =>
    set((state) => ({
      workspaces: state.workspaces.filter(
        (workspace) => workspace.workspaceId !== workspaceId
      ),
    })),
}));

const useBearerStore = create<BearerState>((set) => ({
  config: { ...defaultUser },
  setUsername: (name: string) =>
    set((state) => ({ config: { ...state.config, username: name } })),
  setEmail: (email: string) =>
    set((state) => ({ config: { ...state.config, email: email } })),
  setPhoneNumber: (phonenumber: string) =>
    set((state) => ({ config: { ...state.config, phonenumber: phonenumber } })),
  setuserId: (id: string) =>
    set((state) => ({ config: { ...state.config, id: id } })),
  setImageUrl: (imageUrl: string) =>
    set((state) => ({ config: { ...state.config, imageUrl: imageUrl } })),
}));

// folder store

export type Folder = {
  folderName: string;
  folderId: string;
  workspaceId: string;
};

// Define the FolderState type
type FolderState = {
  folders: Folder[];
  addFolder: (folder: Folder) => void;
  updateFolder: (folder: Folder) => void;
  deleteFolder: (folderId: string) => void;
};

export const useFolderStore = create<FolderState>((set) => ({
  folders: [],
  addFolder: (newFolder) =>
    set((state) => {
      if (
        state.folders.some(
          (folder) => folder.folderName === newFolder.folderName
        )
      ) {
        return state;
      }

      return {
        folders: [...state.folders, newFolder],
      };
    }),
  updateFolder: (updatedFolder) =>
    set((state) => ({
      folders: state.folders.map((folder) =>
        folder.folderId === updatedFolder.folderId ? updatedFolder : folder
      ),
    })),

  deleteFolder: (folderId) =>
    set((state) => ({
      folders: state.folders.filter((folder) => folder.folderId !== folderId),
    })),
}));

export type Board = {
  boardName: string;
  folderId: string;
  workspaceId: string;
  id: string;
  togglVisibilit: boolean;
};

export type Boardstate = {
  board: Board[];
  addBoard: (board: Board) => void;
};

export const useBoardStore = create<Boardstate>((set) => ({
  board: [],
  addBoard: (newBoard) =>
    set((state) => {
      if (state.board.some((board) => board.id === newBoard.id)) {
        return state;
      }

      return {
        board: [...state.board, newBoard],
      };
    }),
}));
export default useBearerStore;



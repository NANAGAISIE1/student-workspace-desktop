interface ElectronAPI {
  minimizeWindow: () => void;
  maximizeWindow: () => void;
  closeWindow: () => void;
  fetchTodos: () => Promise<{
    errors: GraphQLFormattedError[];
    todos: {
      [x: string]: string[];
      content: string;
      isDone: boolean;
      readonly id: string;
      readonly createdAt: string;
      readonly updatedAt: string;
    }[];
  }>;
  createTodo: (content: string) => Promise<{
    errors: GraphQLFormattedError[];
    data: {
      [x: string]: string[];
      content?: string;
      isDone?: boolean;
      readonly id: string;
      readonly createdAt: string;
      readonly updatedAt: string;
    };
  }>;
  // Add any other methods you've exposed from your Electron main process
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}

export {};

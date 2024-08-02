interface ElectronAPI {
  minimizeWindow: () => void;
  maximizeWindow: () => void;
  closeWindow: () => void;
  // Add any other methods you've exposed from your Electron main process
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}

export {};

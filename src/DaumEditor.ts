export interface EditorConfig {
  width?: string | number;
  height?: string | number;
  initialContent?: string;
}

export class DaumEditor {
  container: HTMLElement;
  toolbar: HTMLElement;
  canvas: HTMLElement;
  
  constructor(elementId: string, config: EditorConfig = {}) {
    const root = document.getElementById(elementId);
    if (!root) throw new Error("Root element not found");
    
    this.container = document.createElement('div');
    this.container.className = 'editor-container';
    if (config.width) this.container.style.width = typeof config.width === 'number' ? `${config.width}px` : config.width;
    if (config.height) this.container.style.height = typeof config.height === 'number' ? `${config.height}px` : config.height;
    
    this.toolbar = this.createToolbar();
    this.canvas = this.createCanvas(config.initialContent || '');
    
    this.container.appendChild(this.toolbar);
    this.container.appendChild(this.canvas);
    root.appendChild(this.container);
    
    this.setupEventListeners();
  }
  
  private createCanvas(initialContent: string): HTMLElement {
    const canvas = document.createElement('div');
    canvas.className = 'editor-content-area';
    canvas.contentEditable = 'true';
    canvas.innerHTML = initialContent || '<p><br></p>';
    return canvas;
  }
  
  private createToolbar(): HTMLElement {
    const toolbar = document.createElement('div');
    toolbar.className = 'toolbar';
    // Buttons will be added here
    return toolbar;
  }

  // API similar to legacy DaumEditor
  getContent(): string {
    return this.canvas.innerHTML;
  }
  
  setContent(content: string): void {
    this.canvas.innerHTML = content;
  }
  
  executeCommand(command: string, value: any = null): void {
    this.canvas.focus();
    document.execCommand(command, false, value);
    this.updateToolbarState();
  }
  
  private setupEventListeners(): void {
    this.canvas.addEventListener('mouseup', () => this.updateToolbarState());
    this.canvas.addEventListener('keyup', () => this.updateToolbarState());
    this.canvas.addEventListener('focus', () => this.updateToolbarState());
  }
  
  private updateToolbarState(): void {
    const buttons = this.toolbar.querySelectorAll('.tool-button');
    buttons.forEach(btn => {
      const command = (btn as any)._command;
      if (command && document.queryCommandState(command)) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Method to add tools dynamically
  addTool(id: string, command: string, icon: string, title: string) {
    const btn = document.createElement('button');
    btn.id = id;
    btn.className = 'tool-button';
    btn.title = title;
    btn.innerHTML = icon;
    (btn as any)._command = command;
    btn.onclick = (e) => {
      e.preventDefault();
      this.executeCommand(command);
    };
    this.toolbar.appendChild(btn);
  }
}

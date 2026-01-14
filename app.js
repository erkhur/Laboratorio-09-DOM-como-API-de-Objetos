class MarkdownEditor {
  constructor() {
    this.editor = document.querySelector("#editor");
    this.preview = document.querySelector("#preview");
    this.previewBtn = document.querySelector("#previewBtn");
    this.contrastBtn = document.querySelector("#contrastBtn");
    this.counter = document.querySelector("#counter");

    this.isContrasted = false;

    this.init();
  }

  init() {
    this.previewBtn.addEventListener("click", () => this.generatePreview());
    this.contrastBtn.addEventListener("click", () => this.toggleContrast());
    this.editor.addEventListener("input", () => this.updateCounter());
  }

  generatePreview() {
    let content = this.editor.value;

    // Encabezados
    content = content.replace(/^### (.*$)/gim, "<h3>$1</h3>");
    content = content.replace(/^## (.*$)/gim, "<h2>$1</h2>");
    content = content.replace(/^# (.*$)/gim, "<h1>$1</h1>");

    // Listas
    content = content.replace(/^\- (.*$)/gim, "<li>$1</li>");
    content = content.replace(/(<li>.*<\/li>)/gims, "<ul>$1</ul>");

    // Logro adicional: Negrita e itálica
    content = content.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>");
    content = content.replace(/\*(.*?)\*/gim, "<em>$1</em>");

    this.preview.innerHTML = content;
  }

  toggleContrast() {
    const headers = this.preview.querySelectorAll("h1, h2, h3");

    this.isContrasted = !this.isContrasted;

    headers.forEach(header => {
      if (this.isContrasted) {
        header.classList.add("contrast");
      } else {
        header.classList.remove("contrast");
      }
    });

    this.preview.classList.toggle("contrast");
  }

  updateCounter() {
    const length = this.editor.value.length;
    this.counter.textContent = `${length} caracteres`;
  }
}

new MarkdownEditor();

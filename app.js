const uploadArea = document.getElementById("uploadArea");
const imageInput = document.getElementById("imageInput");
const compressButton = document.getElementById("compressButton");
const comparisonArea = document.getElementById("comparisonArea");
const gallery = document.getElementById("gallery");
const downloadButton = document.getElementById("downloadButton");

let selectedImageFiles = [];

const addEventListeners = () => {
  uploadArea.addEventListener("dragover", handleDragOver);
  uploadArea.addEventListener("dragleave", handleDragLeave);
  uploadArea.addEventListener("drop", handleDrop);
  document.getElementById("uploadButton").addEventListener("click", () => imageInput.click());
  imageInput.addEventListener("change", (e) => handleFiles(e.target.files));
  compressButton.addEventListener("click", compressImages);
};

const handleDragOver = (e) => {
  e.preventDefault();
  uploadArea.classList.add("hover");
};

const handleDragLeave = () => {
  uploadArea.classList.remove("hover");
};

const handleDrop = (e) => {
  e.preventDefault();
  uploadArea.classList.remove("hover");
  handleFiles(e.dataTransfer.files);
};

const handleFiles = (files) => {
  const validFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));
  selectedImageFiles = validFiles;
  showPreview(validFiles);
  toggleCompressButton(validFiles.length > 0);
};

const toggleCompressButton = (enable) => {
  compressButton.disabled = !enable;
  compressButton.classList.toggle("hidden", !enable);
};

const showPreview = (files) => {
  const previewArea = document.createElement("div");
  previewArea.classList.add("preview");

  files.forEach((file) => {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.alt = file.name;
    previewArea.appendChild(img);
  });

  uploadArea.innerHTML = "<p>Drag & Drop your images here</p>";
  uploadArea.appendChild(previewArea);
};

const compressImages = async () => {
  if (selectedImageFiles.length === 0) return;
  gallery.innerHTML = "";

  for (const file of selectedImageFiles) {
    if (file.size > 2 * 1024 * 1024) {
      const originalImageURL = URL.createObjectURL(file);
      const compressedImages = await compressImage(file);
      displayComparison(file.name, originalImageURL, compressedImages);
    } else {
      alert(`${file.name} is below 2MB. Compression is not needed.`);
    }
  }
};

const compressImage = async (file) => {
  const ratios = [0.25, 0.5, 0.75];
  const compressedImages = await Promise.all(ratios.map((ratio) => compressImageBlob(file, ratio)));
  return compressedImages.map((blob) => URL.createObjectURL(blob));
};

const compressImageBlob = (file, quality) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => resolve(blob), "image/jpeg", quality);
      };
    };
    reader.readAsDataURL(file);
  });
};

const displayComparison = (fileName, original, compressedImages) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("comparison-wrapper");

  const title = document.createElement("h3");
  title.textContent = `Comparison for: ${fileName}`;
  wrapper.appendChild(title);

  const ratios = ["Original", "75% Compression", "50% Compression", "25% Compression"];
  const images = [original, ...compressedImages];

  images.forEach((src, index) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("image-wrapper");

    const img = document.createElement("img");
    img.src = src;
    img.alt = ratios[index];
    img.onclick = () => selectImage(img);

    const label = document.createElement("p");
    label.textContent = ratios[index];

    imageWrapper.appendChild(img);
    imageWrapper.appendChild(label);
    wrapper.appendChild(imageWrapper);
  });

  gallery.appendChild(wrapper);
  comparisonArea.classList.remove("hidden");
  downloadButton.classList.remove("hidden");
};

const selectImage = (img) => {
  document.querySelectorAll(".comparison-wrapper img").forEach((image) => image.classList.remove("selected"));
  img.classList.add("selected");

  downloadButton.onclick = () => {
    const link = document.createElement("a");
    link.href = img.src;
    link.download = "compressed-image.jpg";
    link.click();
  };
};

addEventListeners();


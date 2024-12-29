const uploadArea = document.getElementById("uploadArea");
const imageInput = document.getElementById("imageInput");
const compressButton = document.getElementById("compressButton");
const comparisonArea = document.getElementById("comparisonArea");
const gallery = document.getElementById("gallery");
const downloadButton = document.getElementById("downloadButton");

let selectedImageFiles = [];

uploadArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadArea.classList.add("hover");
});

uploadArea.addEventListener("dragleave", () => {
  uploadArea.classList.remove("hover");
});

uploadArea.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadArea.classList.remove("hover");
  handleFiles(e.dataTransfer.files);
});

document.getElementById("uploadButton").addEventListener("click", () => {
  imageInput.click();
});

imageInput.addEventListener("change", (e) => {
  handleFiles(e.target.files);
});

function handleFiles(files) {
  const validFiles = Array.from(files).filter((file) =>
    file.type.startsWith("image/")
  );

  selectedImageFiles = validFiles;
  showPreview(validFiles);

  if (validFiles.length > 0) {
    compressButton.disabled = false;
    compressButton.classList.remove("hidden");
  }
}

function showPreview(files) {
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
}

compressButton.addEventListener("click", async () => {
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
});

async function compressImage(file) {
  const ratios = [0.25, 0.5, 0.75];
  const compressedImages = [];

  for (const ratio of ratios) {
    const compressedBlob = await compressImageBlob(file, ratio);
    compressedImages.push(URL.createObjectURL(compressedBlob));
  }
  return compressedImages;
}

function compressImageBlob(file, quality) {
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
}

function displayComparison(fileName, original, compressedImages) {
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
}

function selectImage(img) {
  const images = document.querySelectorAll(".comparison-wrapper img");
  images.forEach((image) => image.classList.remove("selected"));
  img.classList.add("selected");

  downloadButton.onclick = () => {
    const link = document.createElement("a");
    link.href = img.src;
    link.download = "compressed-image.jpg";
    link.click();
  };
}


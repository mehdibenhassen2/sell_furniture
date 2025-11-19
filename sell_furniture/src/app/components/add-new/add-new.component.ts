import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
declare var cloudinary: any; // Cloudinary widget global

@Component({
  selector: 'app-add-new',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, //
    HttpClientModule,
  ],
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {
  itemForm!: FormGroup;
  categories = [
    'Bed', 'Dresser', 'Bookshelves & Wardrobe', 'Technology',
    'Decoration', 'Table & Chair', 'Toys', 'Other'
  ];

  loading = false;

  images: string[] = []; // Local previews
  uploadedImages: string[] = []; // Cloudinary previews
  selectedFiles: File[] = []; // Local files

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      price: [null, Validators.required],
      category: [''],
      retail: [],
      condition: ['Good'],
      instructions: [''],
      url: [''],
      available: [true],
      pictures: [[]] // stores Cloudinary URLs
    });
  }

  /** ==================== Local File Handling ==================== **/

  onFileSelect(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.selectedFiles.push(file);
      this.images.push(URL.createObjectURL(file)); // preview
    }
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files) {
      this.onFileSelect({ target: { files } });
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    // Optional: add visual highlight
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    // Optional: remove visual highlight
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
    this.selectedFiles.splice(index, 1);
  }

  /** ==================== Cloudinary Widget ==================== **/

  openCloudinaryWidget() {
    // Ensure Cloudinary Media Library script is loaded in index.html:
    // <script src="https://media-library.cloudinary.com/global/all.js"></script>
  
    const cloudinaryMediaLibrary = cloudinary.createMediaLibrary(
      {
        cloud_name: 'dhm6vqs0t',
        api_key: '279487912748128', // replace with your Cloudinary API key
        username: 'alfredbouha@gmail.com', // your Cloudinary account email
        multiple: true,
        insert_caption: 'Select Image',
        search: {
          expression: 'folder="Home/ikea"', // restricts to that folder
        },
      },
      {
        insertHandler: (data: any) => {
          const selectedUrls = data.assets.map((asset: any) => asset.secure_url);
  
          this.uploadedImages.push(...selectedUrls);
  
          const pictures = this.itemForm.get('pictures')?.value || [];
          this.itemForm.patchValue({
            pictures: [...pictures, ...selectedUrls],
          });
        },
      }
    );
  
    cloudinaryMediaLibrary.show();
  }
  

  removeCloudImage(index: number) {
    this.uploadedImages.splice(index, 1);
    const pictures = this.itemForm.get('pictures')?.value || [];
    pictures.splice(index, 1);
    this.itemForm.patchValue({ pictures });
  }

  /** ==================== Form Submission ==================== **/

  addItem() {
    if (this.itemForm.invalid) return;

    this.loading = true;

    const token = localStorage.getItem('token');
    const formData = new FormData();

    // Append regular fields except pictures
    Object.keys(this.itemForm.value).forEach(key => {
      if (key !== 'pictures') {
        formData.append(key, this.itemForm.value[key]);
      }
    });

    // Append local files
    this.selectedFiles.forEach(file => formData.append('images', file));

    // Append Cloudinary URLs
    const pictureUrls = this.itemForm.get('pictures')?.value || [];
    pictureUrls.forEach((url: string) => formData.append('pictures', url));

    this.http.post(
      'https://sell-furniture-node.onrender.com/api/items',
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    ).subscribe({
      next: (res) => {
        console.log('✅ Item added:', res);
        alert('Item added successfully!');
        this.resetForm();
      },
      error: (err) => {
        console.error('❌ Failed to add item:', err);
        alert('Failed to add item');
        this.loading = false;
      },
      complete: () => this.loading = false
    });
  }

  private resetForm() {
    this.itemForm.reset({
      title: '',
      description: '',
      price: null,
      category: '',
      retail: null,
      condition: 'Good',
      instructions: '',
      url: '',
      available: true,
      pictures: []
    });
    this.selectedFiles = [];
    this.images = [];
    this.uploadedImages = [];
  }
}

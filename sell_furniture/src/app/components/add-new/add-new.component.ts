import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-new',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, //
    HttpClientModule,
  ],
  templateUrl: './add-new.component.html',
  styleUrl: './add-new.component.scss',
})
export class AddNewComponent implements OnInit {
  itemForm!: FormGroup;
  items: any[] = [];
  categories = [
    'Bed',
    'Dresser',
    'Bookshelves & Wardrobe',
    'Technology',
    'Decoration',
    'Table & Chair',
    'Toys',
    'Other',
  ];
  loading = false;
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
    });
  }
  images: string[] = []; // store preview URLs
  files: File[] = []; // store actual files
  
  onFileSelect(event: any) {
    const selectedFiles = event.target.files;
    this.handleFiles(selectedFiles);
  }
  
  onFileDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      this.handleFiles(event.dataTransfer.files);
    }
  }
  
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
  
  onDragLeave(event: DragEvent) {
    event.preventDefault();
  }
  
  handleFiles(fileList: FileList) {
    Array.from(fileList).forEach((file) => {
      if (file.type.startsWith('image/')) {
        this.files.push(file);
  
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.images.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    });
  }
  
  removeImage(index: number) {
    this.files.splice(index, 1);
    this.images.splice(index, 1);
  }
  addItem() {
    if (this.itemForm.invalid) return;
  
    const token = localStorage.getItem("token");
  
    const formData = new FormData();
    Object.keys(this.itemForm.value).forEach(key => {
      formData.append(key, this.itemForm.value[key]);
    });
  
    this.files.forEach(file => {
      formData.append("images", file); // must match upload.array("images")
    });
  
    this.loading = true;
    this.http.post(
      "https://sell-furniture-node.onrender.com/api/items",
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    ).subscribe({
      next: (res) => {
        console.log("✅ Item added:", res);
        alert("Item added successfully!");
        this.loading = false;
      },
      error: (err) => {
        console.error("❌ Failed to add item:", err);
        alert("Failed to add item");
        this.loading = false;
      }
    });
  }
}

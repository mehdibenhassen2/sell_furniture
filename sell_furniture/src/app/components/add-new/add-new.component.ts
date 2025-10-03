import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-new',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,  // 
    HttpClientModule   ],
  templateUrl: './add-new.component.html',
  styleUrl: './add-new.component.scss'
})
export class AddNewComponent implements OnInit {
  itemForm!: FormGroup;
  items: any[] = [];
  categories = ['Furniture', 'Electronics', 'Kitchen', 'Other']; // adapt to your needs
  loading = false;
constructor(private fb: FormBuilder, private http: HttpClient){

}
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
      available: [true]
    });

  }


addItem() {
  if (this.itemForm.invalid) return;

  const token = localStorage.getItem('token'); // stored at login
  this.http.post(
    'https://sell-furniture-node.onrender.com/api/items',
    this.itemForm.value,
    { headers: { Authorization: `Bearer ${token}` } }
  ).subscribe({
    next: res => {
      console.log('✅ Item added:', res);
      alert("Item added successfully!");
    },
    error: err => {
      console.error("❌ Failed to add item:", err);
      alert("Failed to add item");
    }
  });
}

}

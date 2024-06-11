import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DislikeCategoryComponent } from "../dislikes-category/dislikes-category.component";
import { DislikeItemsComponent } from "../dislike-items/dislike-items.component";

@Component({
  selector: "app-dislikes",
  standalone: true,
  imports: [CommonModule, DislikeCategoryComponent, DislikeItemsComponent],
  templateUrl: "./dislikes.component.html",
  styleUrls: ["./dislikes.component.scss"],
})
export class DislikesComponent {}

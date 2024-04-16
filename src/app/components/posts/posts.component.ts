import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as PostActions from "../../store/actions";
import { TuiButtonModule, TuiLoaderModule } from "@taiga-ui/core";
import { isLoadingSelector, postsSelector } from "src/app/store/selectors";
import { Observable } from "rxjs";
import { AppState } from "src/app/shared/interfaces/appState.interface";
import { Post } from "src/app/shared/interfaces/post.interface";
import { EffectsModule } from "@ngrx/effects";
import { PostsEffects } from "src/app/store/effects";

@Component({
	selector: "posts",
	standalone: true,
	// imports: [CommonModule, StoreModule.forFeature("posts", reducers)],
	imports: [
		CommonModule,
		TuiButtonModule,
		TuiLoaderModule,
		// EffectsModule.forFeature([PostsEffects]),
	],
	templateUrl: "./posts.component.html",
	styleUrl: "./posts.component.scss",
})
export class PostsComponent implements OnInit {
	public isLoading$: Observable<boolean>;
	public posts$: Observable<Post[]>;

	constructor(private store: Store<AppState>) {
		this.isLoading$ = this.store.pipe(select(isLoadingSelector));
		this.posts$ = store.pipe(select(postsSelector));
	}

	public ngOnInit(): void {
		this.store.dispatch(PostActions.getPosts());
	}
}

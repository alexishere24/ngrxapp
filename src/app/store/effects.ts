import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as PostsActions from "./actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { PostService } from "../shared/services/post.service";
import { Injectable } from "@angular/core";

@Injectable()
export class PostsEffects {
	public getPosts$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PostsActions.getPosts),
			mergeMap(() => {
				return this.postService.getPosts().pipe(
					map((posts) => PostsActions.getPostsSuccess({ posts })),
					catchError((error) =>
						of(
							PostsActions.getPostsFailure({
								error: error.message,
							})
						)
					)
				);
			})
		)
	);

	constructor(private actions$: Actions, private postService: PostService) {}
}

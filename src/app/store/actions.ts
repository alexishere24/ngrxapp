import { createAction, props } from "@ngrx/store";
import { Post } from "../shared/interfaces/post.interface";

export const getPosts = createAction("[Posts] Get Posts");

export const getPostsSuccess = createAction(
	"[Posts] Get Posts success",
	props<{ posts: Post[] }>()
);
export const getPostsFailure = createAction(
	"[Posts] Get Posts failure",
	props<{ error: string }>()
);

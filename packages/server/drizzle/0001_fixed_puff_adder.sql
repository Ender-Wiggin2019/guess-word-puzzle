CREATE TABLE `challenge_results` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`challenge_id` text NOT NULL,
	`score` integer NOT NULL,
	`time` integer NOT NULL,
	`difficulty` text NOT NULL,
	`completed_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);

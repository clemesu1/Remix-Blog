import { Link, useLoaderData } from 'remix'
import { db } from '~/utils/db.server';

export const loader = async () => {
	return {
		posts: await db.post.findMany({ // options
			take: 20,
			select: { id: true, title: true, createdAt: true },
			orderBy: { createdAt: 'desc' }
		})
	}
}

function PostItems() {
	const { posts } = useLoaderData();
	return (
		<div>
			<div className="page-header">
				<h1>Posts</h1>
				<Link to='/posts/new' className='btn'>
					New Post
				</Link>
			</div>
			<ul className="post-list">
				{posts.map((post) => (
					<li key={post.id}>
						<Link to={`/posts/${post.id}`}>
							<h3>{post.title}</h3>
							{new Date(post.createdAt).toLocaleString()}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

export default PostItems
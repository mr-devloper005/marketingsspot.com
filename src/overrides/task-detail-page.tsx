import { notFound } from 'next/navigation'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { DirectoryTaskDetailPage } from '@/design/products/directory/task-detail-page'
import { getTaskConfig } from '@/lib/site-config'
import type { TaskKey } from '@/lib/site-config'
import { fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'

export const TASK_DETAIL_PAGE_OVERRIDE_ENABLED = true

function getContent(post: Awaited<ReturnType<typeof fetchTaskPostBySlug>>) {
  return post?.content && typeof post.content === 'object'
    ? (post.content as Record<string, any>)
    : {}
}

function getImages(post: NonNullable<Awaited<ReturnType<typeof fetchTaskPostBySlug>>>, content: Record<string, any>) {
  const media = Array.isArray(post.media)
    ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && Boolean(url))
    : []
  const contentImages = Array.isArray(content.images)
    ? content.images.filter((url: unknown): url is string => typeof url === 'string' && Boolean(url))
    : []
  return [...new Set([...media, ...contentImages, content.image, content.logo].filter((url): url is string => typeof url === 'string' && Boolean(url)))]
}

function getMapUrl(content: Record<string, any>, location: string) {
  const latitude = Number(content.latitude)
  const longitude = Number(content.longitude)
  if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
    return `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01}%2C${latitude - 0.01}%2C${longitude + 0.01}%2C${latitude + 0.01}&layer=mapnik&marker=${latitude}%2C${longitude}`
  }
  return location ? `https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed` : null
}

export async function TaskDetailPageOverride({ task, slug }: { task: TaskKey; slug: string }) {
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()

  const taskConfig = getTaskConfig(task)
  const content = getContent(post)
  const category = content.category || post.tags?.[0] || taskConfig?.label || task
  const description = content.description || post.summary || 'Details coming soon.'
  const location = content.address || content.location || ''
  const images = getImages(post, content)
  const related = (await fetchTaskPosts(task, 6))
    .filter((item) => item.slug !== post.slug)
    .filter((item) => !content.category || getContent(item).category === content.category)
    .slice(0, 3)

  return (
    <div className="listing-detail-without-promo min-h-screen bg-[#f8fbff]">
      <style>{`
        .listing-detail-without-promo h1 + h2,
        .listing-detail-without-promo h1 + h2 + * {
          display: none;
        }
      `}</style>
      <NavbarShell />
      <DirectoryTaskDetailPage
        task={task}
        taskLabel={taskConfig?.label || task}
        taskRoute={taskConfig?.route || '/'}
        post={post}
        description={description}
        category={category}
        images={images.length ? images : ['/placeholder.svg?height=900&width=1400']}
        mapEmbedUrl={getMapUrl(content, location)}
        related={related}
      />
      <Footer />
    </div>
  )
}

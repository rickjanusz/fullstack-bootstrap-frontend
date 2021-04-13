import CoursePlayer from '../components/CoursePlayer'

export default function TutorialPage() {
  return (
    <CoursePlayer
      albumId={8356159}
      clientId={process.env.NEXT_PUBLIC_VIMEO_CLIENT_ID}
      clientSecret={process.env.NEXT_PUBLIC_VIMEO_CLIENT_SECRET}
      accessToken={process.env.NEXT_PUBLIC_VIMEO_ACCESS_TOKEN}
      userId={102997300}
    />
  )
}

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="space-y-6">
        {/* Company Profile Skeleton */}
        <Card>
          <CardHeader className="flex flex-row items-center space-x-4 p-4">
            <Skeleton className="h-12 w-12 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-64" />
              <Skeleton className="h-4 w-48" />
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-9 w-32 mt-2" />
            <div className="grid md:grid-cols-2 gap-6 pt-4">
              <div>
                <Skeleton className="h-5 w-24 mb-3" />
                <Skeleton className="h-20 w-full" />
              </div>
              <div>
                <Skeleton className="h-5 w-24 mb-3" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Management Skeleton */}
        <div>
          <Skeleton className="h-7 w-56 mb-4" />
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <Card key={i}>
                <CardHeader className="p-4">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 grid md:grid-cols-2 gap-6">
                  <div>
                    <Skeleton className="h-5 w-24 mb-3" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                  <div>
                    <Skeleton className="h-5 w-24 mb-3" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

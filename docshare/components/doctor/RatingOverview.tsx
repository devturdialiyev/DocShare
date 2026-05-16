"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Star, TrendingUp, MessageSquare } from "lucide-react";

interface Review {
  id: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
}

const reviews: Review[] = [
  {
    id: "1",
    patientName: "Nodira K.",
    rating: 5,
    comment: "Dr. Turdialiyev is very attentive and explains everything clearly. Highly recommend!",
    date: "2 days ago",
  },
  {
    id: "2",
    patientName: "Aziz R.",
    rating: 5,
    comment: "Excellent cardiologist. Took time to understand my condition and provided great treatment.",
    date: "1 week ago",
  },
  {
    id: "3",
    patientName: "Gulnora S.",
    rating: 4,
    comment: "Very professional and knowledgeable. The wait time could be shorter.",
    date: "2 weeks ago",
  },
];

const RatingOverview = () => {
  const [hoverRating, setHoverRating] = React.useState(0);
  const totalReviews = 89;
  const averageRating = 4.9;
  
  const ratingDistribution = [
    { stars: 5, count: 78, percentage: 88 },
    { stars: 4, count: 8, percentage: 9 },
    { stars: 3, count: 2, percentage: 2 },
    { stars: 2, count: 1, percentage: 1 },
    { stars: 1, count: 0, percentage: 0 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center">
              <Star className="w-4 h-4 text-white" />
            </div>
            Rating Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Rating Summary */}
          <div className="flex items-center gap-6 mb-6">
            {/* Big Rating */}
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-800">{averageRating}</div>
              <div className="flex items-center justify-center gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      "w-5 h-5",
                      star <= Math.floor(averageRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-1">{totalReviews} reviews</p>
            </div>

            {/* Rating Distribution */}
            <div className="flex-1 space-y-2">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 w-8">{item.stars}★</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="h-full bg-yellow-400 rounded-full"
                    />
                  </div>
                  <span className="text-xs text-gray-500 w-8">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-800 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Recent Reviews
            </h4>
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="p-4 bg-gray-50 rounded-xl"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800">{review.patientName}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-3 h-3",
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{review.comment}</p>
                  </div>
                  <span className="text-xs text-gray-400">{review.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RatingOverview;

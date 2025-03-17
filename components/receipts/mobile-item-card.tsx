"use client";

import type {
  Item,
  ItemCreateManyReceiptInputSchema,
} from "@/prisma/generated/zod";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { z } from "zod";

interface MobileItemCardProps {
  item: z.infer<typeof ItemCreateManyReceiptInputSchema>;
  onEdit: () => void;
  onDelete: () => void;
}

export function MobileItemCard({
  item,
  onEdit,
  onDelete,
}: MobileItemCardProps) {
  return (
    <Card className="mb-3 md:hidden">
      <CardContent className="pt-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-muted-foreground">
              ${item.price.toFixed(2)} × {item.quantity}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <Badge variant="outline" className="text-xs">
              {item.materialCategory}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {item.wasteCategory}
            </Badge>
          </div>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-1 text-sm">
          <div>
            <span className="text-muted-foreground">Weight:</span> {item.weight}{" "}
            {item.weightUnit}
          </div>
          {item.brand && (
            <div>
              <span className="text-muted-foreground">Brand:</span> {item.brand}
            </div>
          )}
          {item.expiry && (
            <div>
              <span className="text-muted-foreground">Expires:</span>{" "}
              {format(item.expiry, "PPP")}
            </div>
          )}
          {item.isConsumed !== null && (
            <div>
              <span className="text-muted-foreground">Status:</span>{" "}
              {item.isConsumed ? "Consumed" : "Not consumed"}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-0">
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Edit className="h-4 w-4 mr-1" /> Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={onDelete}>
          <Trash2 className="h-4 w-4 mr-1" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import cuid from "@bugsnag/cuid";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ItemWithoutIdSchema } from "@/lib/schema/extended";

interface ItemFormProps {
  onAddItem: (item: z.infer<typeof ItemWithoutIdSchema>) => void;
  initialItem?: z.infer<typeof ItemWithoutIdSchema>;
  onCancel?: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerButtonText?: string;
}

export function ItemForm({
  onAddItem,
  initialItem,
  onCancel,
  open,
  setOpen,
  triggerButtonText = "Add Item Details",
}: ItemFormProps) {
  const form = useForm<z.infer<typeof ItemWithoutIdSchema>>({
    resolver: zodResolver(ItemWithoutIdSchema),
    defaultValues: {
      id: cuid(),
      name: initialItem?.name || "",
      price: initialItem?.price,
      weight: initialItem?.weight,
      weightUnit: initialItem?.weightUnit || "g",
      quantity: initialItem?.quantity,
      materialCategory: initialItem?.materialCategory || "PLASTIC",
      wasteCategory: initialItem?.wasteCategory || "RECYCLE",
      expiry: initialItem?.expiry || undefined,
      brand: initialItem?.brand || undefined,
      isConsumed: initialItem?.isConsumed || false,
    },
  });

  const onSubmit = (data: z.infer<typeof ItemWithoutIdSchema>) => {
    console.log(`Trying to add item`, data);
    onAddItem(data);
    setOpen(false);
    form.reset();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Only render the trigger button if a parent component isn't controlling the dialog */}
      {!open && (
        <DialogTrigger asChild>
          <Button variant="outline">{triggerButtonText}</Button>
        </DialogTrigger>
      )}
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Item Details</DialogTitle>
          <DialogDescription>
            Add detailed information about this item.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Milk" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="1"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(Number.parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weightUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight Unit</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || "g"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="g">Grams (g)</SelectItem>
                        <SelectItem value="kg">Kilograms (kg)</SelectItem>
                        <SelectItem value="mg">Milligrams (mg)</SelectItem>
                        <SelectItem value="l">Liters (l)</SelectItem>
                        <SelectItem value="ml">Milliliters (ml)</SelectItem>
                        <SelectItem value="dozen">Dozen</SelectItem>
                        <SelectItem value="piece">Piece</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Brand name"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value || null)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expiry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={
                        field.value instanceof Date
                          ? field.value.toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? new Date(e.target.value) : null
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="materialCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select material" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="PAPER">Paper</SelectItem>
                      <SelectItem value="PLASTIC">Plastic</SelectItem>
                      <SelectItem value="FOOD">Food</SelectItem>
                      <SelectItem value="GLASS">Glass</SelectItem>
                      <SelectItem value="METAL">Metal</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="wasteCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Waste Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select waste category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="RECYCLE">Recycle</SelectItem>
                      <SelectItem value="COMPOST">Compost</SelectItem>
                      <SelectItem value="LANDFILL">Landfill</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isConsumed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value || false}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Consumed</FormLabel>
                    <FormDescription>
                      Mark if this item has been consumed.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={async () => {
                  console.log("Attempting to validate form...");
                  await form.handleSubmit(
                    (data) => {
                      console.log("Validation successful! Calling onSubmit...");
                      onSubmit(data); // Call onSubmit after successful validation
                    },
                    (errors) => {
                      console.error("Validation failed!", errors);
                    }
                  )();
                }}
              >
                Save Item
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

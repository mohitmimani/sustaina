"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import cuid from "@bugsnag/cuid";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { MobileItemCard } from "./mobile-item-card";

import { ItemForm } from "./item-form";
import {
  ItemWithoutId,
  ItemWithoutIdSchema,
  ReceiptWithoutIdSchema,
} from "@/lib/schema/extended";

interface ItemFormProps {
  onAddItem: (item: ItemWithoutId) => void;
  initialItem?: ItemWithoutId;
  onCancel: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function AddReceiptButton() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<ItemWithoutId[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [showItemForm, setShowItemForm] = useState(false);
  const [currentEditingItem, setCurrentEditingItem] = useState<{
    item: ItemWithoutId;
    index: number;
  } | null>(null);

  const form = useForm<z.infer<typeof ReceiptWithoutIdSchema>>({
    resolver: zodResolver(ReceiptWithoutIdSchema),
    defaultValues: {
      date: new Date(),
      name: "",
      amount: "",
      type: "GROCERIES", // Default value for type
    },
  });

  function addNewItem() {
    setCurrentEditingItem(null);
    setShowItemForm(true);
  }

  function removeItem(id: string) {
    setItems(items.filter((item) => item.id !== id));
  }

  function editItem(index: number) {
    const item = items[index];
    setCurrentEditingItem({ item, index });
    setShowItemForm(true);
  }

  const onSubmit = async (data: z.infer<typeof ReceiptWithoutIdSchema>) => {
    setIsSubmitting(true);
    try {
      const receiptWithItems = {
        ...data,
        items: items.map((item) => ({
          ...item,
        })),
      };

      const response = await fetch("/api/receipts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(receiptWithItems),
      });

      if (!response.ok) {
        throw new Error("Failed to create receipt");
      }

      toast({
        title: "Receipt created",
        description: "Your receipt has been successfully created.",
      });

      // Reset form and close modal
      form.reset();
      setItems([]);
      setOpen(false);
    } catch (error) {
      console.error("Error creating receipt:", error);
      toast({
        title: "Error creating receipt",
        description: "Failed to create receipt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white">
          Add Receipt <Plus className="ml-2 h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-[90vh]  overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>Add a new receipt</AlertDialogTitle>
          <AlertDialogDescription>
            Add the details of your receipt below.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receipt Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Grocery Shopping" {...field} />
                  </FormControl>
                  <FormDescription>Name for this receipt</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>The date on the receipt.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="Rs 0.00" {...field} />
                  </FormControl>
                  <FormDescription>
                    The total amount on the receipt.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receipt Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="GROCERIES">Groceries</SelectItem>
                      <SelectItem value="ELECTRONICS">Electronics</SelectItem>
                      <SelectItem value="CLOTHING">Clothing</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>The type of the receipt.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" variant="secondary" onClick={addNewItem}>
              Add Item
            </Button>
            {showItemForm && (
              <ItemForm
                onAddItem={(updatedItem) => {
                  if (currentEditingItem) {
                    // Update existing item
                    const newItems = [...items];
                    newItems[currentEditingItem.index] = updatedItem;
                    setItems(newItems);
                    setCurrentEditingItem(null);
                  } else {
                    // Add new item
                    setItems([...items, updatedItem]);
                  }
                  setShowItemForm(false);
                }}
                initialItem={currentEditingItem?.item}
                onCancel={() => {
                  setShowItemForm(false);
                  setCurrentEditingItem(null);
                }}
                open={showItemForm}
                setOpen={setShowItemForm}
              />
            )}

            {/* Mobile Item Cards */}
            <div className="md:hidden">
              {items.map((item, index) => (
                <MobileItemCard
                  key={item.id}
                  item={item}
                  onEdit={() => editItem(index)}
                  onDelete={() => removeItem(item.id || "")}
                />
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableCaption>A list of your items.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Material</TableHead>
                    <TableHead>Waste Type</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>Rs {item.price.toFixed(2)}</TableCell>
                      <TableCell>
                        {item.weight} {item.weightUnit}
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.materialCategory}</TableCell>
                      <TableCell>{item.wasteCategory}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => editItem(index)}
                          >
                            Edit
                          </Button>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeItem(item.id || "")}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={5}>Total</TableCell>
                    <TableCell colSpan={2}>
                      Rs
                      {items
                        .reduce(
                          (acc, item) => acc + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button
                type="button"
                disabled={isSubmitting}
                onClick={async () => {
                  console.log("Attempting to validate form...");
                  await form.handleSubmit(
                    (data) => {
                      console.log("Validation successful! Calling onSubmit...");

                      onSubmit(data); // Call onSubmit after successful validation
                    },
                    (errors) => {
                      const receiptWithItems = {
                        items: items.map((item) => ({
                          ...item,
                        })),
                      };
                      console.error("Validation failed!", errors.items);
                    }
                  )();
                }}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

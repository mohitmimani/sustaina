"use client";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

interface ReceiptFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
}

export function ReceiptFilters({
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
  sortOrder,
  setSortOrder,
}: ReceiptFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search receipts..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter Receipts</DialogTitle>
                <DialogDescription>
                  Select filters to apply to your receipts list
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Date Range</h3>
                  <div className="flex gap-2">
                    <Input type="date" className="flex-1" />
                    <Input type="date" className="flex-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Waste Type</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer">
                      Recycle
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer">
                      Compost
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer">
                      Landfill
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer">
                      Mixed
                    </Badge>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Reset</Button>
                <Button>Apply Filters</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <span>Sort by</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Date (Newest)</SelectItem>
              <SelectItem value="date-asc">Date (Oldest)</SelectItem>
              <SelectItem value="amount-desc">Amount (Highest)</SelectItem>
              <SelectItem value="amount-asc">Amount (Lowest)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Tabs
        defaultValue={activeTab}
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="groceries">Groceries</TabsTrigger>
          <TabsTrigger value="electronics">Electronics</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}

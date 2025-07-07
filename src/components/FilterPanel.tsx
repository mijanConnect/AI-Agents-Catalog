"use client";

import { RootState } from "@/store";
import { clearFilters, updateFilters } from "@/store/agentSlice";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const statusOptions = ["Active", "Beta", "Archived"];
const pricingOptions = ["Free Tier", "Subscription", "Per-Use"];

export default function FilterPanel() {
  const dispatch = useDispatch();
  const { filters, agents } = useSelector((state: RootState) => state.agent);

  const uniqueCategories = useMemo(() => {
    return [...new Set(agents.map((a) => a.category))].sort();
  }, [agents]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFilters({ search: e.target.value }));
  };

  const handleCheckboxChange = (type: "status" | "category", value: string) => {
    const selected = filters[type].includes(value)
      ? filters[type].filter((v) => v !== value)
      : [...filters[type], value];

    dispatch(updateFilters({ [type]: selected }));
  };

  const handlePricingChange = (value: string) => {
    dispatch(updateFilters({ pricingModel: value }));
  };

  const handleClear = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="bg-muted/50 rounded-lg p-4 space-y-4 border">
      {/* Search Input */}
      <div>
        <Label htmlFor="search" className="mb-2 text-xl font-bold">
          Search
        </Label>
        <Input
          id="search"
          placeholder="Search by name or description"
          value={filters.search}
          onChange={handleSearchChange}
        />
      </div>

      {/* Status Filter */}
      <div>
        <Label className="mb-2 text-xl font-bold">Status</Label>
        <div className="flex gap-4 flex-wrap mt-1">
          {statusOptions.map((status) => (
            <div key={status} className="flex items-center space-x-2">
              <Checkbox
                id={`status-${status}`}
                checked={filters.status.includes(status)}
                onCheckedChange={() => handleCheckboxChange("status", status)}
              />
              <Label htmlFor={`status-${status}`}>{status}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <Label className="mb-2 text-xl font-bold">Category</Label>
        <div className="flex gap-4 flex-wrap mt-1">
          {uniqueCategories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={filters.category.includes(category)}
                onCheckedChange={() =>
                  handleCheckboxChange("category", category)
                }
              />
              <Label htmlFor={`category-${category}`}>{category}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Filter */}
      <div>
        <Label className="mb-2 text-xl font-bold">Pricing Model</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="mt-1">
              {filters.pricingModel || "Select Pricing"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {pricingOptions.map((model) => (
              <DropdownMenuItem
                key={model}
                onClick={() => handlePricingChange(model)}
              >
                {model}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem
              onClick={() => handlePricingChange("")}
              className="text-red-700"
            >
              Clear Price
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Clear Button */}
      <Button variant="destructive" onClick={handleClear}>
        Clear All Filters
      </Button>
    </div>
  );
}

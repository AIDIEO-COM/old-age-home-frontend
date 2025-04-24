import { useState } from "react";
import {
  useGetCheckDetailsQuery,
  useSubmitCheckMutation,
} from "@/store/services/checksApi";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

const ChecksTemplate = ({ title, icon: Icon, checkType }) => {
  const {
    data: checks,
    isLoading,
    refetch,
  } = useGetCheckDetailsQuery(checkType);
  const [submitCheck, { isLoading: isSubmitting }] = useSubmitCheckMutation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    status: "Completed",
    notes: "",
  });
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value) => {
    setFormData((prev) => ({ ...prev, status: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await submitCheck({
        type: checkType,
        ...formData,
      }).unwrap();

      toast({
        title: "Check submitted",
        description: `${checkType} check for ${formData.location} has been recorded.`,
      });

      setFormData({
        location: "",
        status: "Completed",
        notes: "",
      });

      setIsDialogOpen(false);
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit check. Please try again.",
      });
    }
  };

  // Get badge variant based on status
  const getStatusVariant = (status) => {
    switch (status) {
      case "Completed":
        return "default";
      case "Pending":
        return "secondary";
      case "Requires Attention":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      {/* <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4 bg-primary/10 p-2 rounded-full">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
            <p className="text-muted-foreground">Manage and track {title.toLowerCase()}</p>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Record New Check</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Record New {title}</DialogTitle>
              <DialogDescription>
                Fill out the form below to record a new check.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">Location</label>
                <Input 
                  id="location" 
                  name="location" 
                  placeholder="e.g., Room 101" 
                  value={formData.location} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">Status</label>
                <Select value={formData.status} onValueChange={handleStatusChange}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Requires Attention">Requires Attention</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="notes" className="text-sm font-medium">Notes</label>
                <Textarea 
                  id="notes" 
                  name="notes" 
                  placeholder="Add any notes or observations" 
                  value={formData.notes} 
                  onChange={handleChange} 
                  rows={3} 
                />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Check'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div> */}

      {/* <Card>
        <CardHeader>
          <CardTitle>Recent Checks</CardTitle>
          <CardDescription>List of recent {title.toLowerCase()}</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Location</TableHead>
                  <TableHead>Last Checked</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Checked By</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {checks && checks.length > 0 ? (
                  checks.map((check) => (
                    <TableRow key={check.id}>
                      <TableCell>{check.location}</TableCell>
                      <TableCell>{format(new Date(check.lastChecked), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(check.status)}>
                          {check.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{check.checkedBy}</TableCell>
                      <TableCell className="max-w-xs truncate">{check.notes}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      No check records found. Start by adding a new check.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              
            </Table>
          )}
        </CardContent>
      </Card> */}
      <Card>
        <CardHeader>
          <CardTitle className=" capitalize">{title.toLowerCase()} </CardTitle>
          <CardDescription>
            List of recent {title.toLowerCase()}
          </CardDescription>
        </CardHeader>
       <CardContent>
       <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
       </CardContent>
      </Card>
    </div>
  );
};

export default ChecksTemplate;

import { useState } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MessageSquare, FileText, Plus } from "lucide-react";
import { toast } from "sonner";

const CommunicationTimeline = () => {
  const { candidateId } = useParams();
  const [note, setNote] = useState("");
  const [callSummary, setCallSummary] = useState("");

  const candidate = {
    name: "John Doe",
    role: "Senior Software Engineer",
    experience: "5 years",
    skills: ["JavaScript", "React", "Node.js", "MongoDB"],
    phone: "+91-9876543210",
    email: "john.doe@email.com",
  };

  const timeline = [
    { id: 1, type: "status", text: "Application received", time: "2024-01-15 10:30 AM" },
    { id: 2, type: "note", text: "Strong technical background. Schedule interview.", time: "2024-01-16 02:15 PM" },
    { id: 3, type: "call", text: "Initial screening call - 30 mins. Candidate is interested.", time: "2024-01-17 11:00 AM" },
    { id: 4, type: "status", text: "Moved to Shortlisted", time: "2024-01-18 09:45 AM" },
    { id: 5, type: "reminder", text: "Schedule technical interview with hiring manager", time: "2024-01-19 03:00 PM" },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "call": return <Phone className="h-4 w-4" />;
      case "note": return <FileText className="h-4 w-4" />;
      case "status": return <MessageSquare className="h-4 w-4" />;
      case "reminder": return <MessageSquare className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const handleAddNote = () => {
    if (note.trim()) {
      toast.success("Note added successfully!");
      setNote("");
    }
  };

  const handleAddCallSummary = () => {
    if (callSummary.trim()) {
      toast.success("Call summary added successfully!");
      setCallSummary("");
    }
  };

  return (
    <DashboardLayout userRole="recruiter">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Communication Timeline</h1>
          <p className="text-muted-foreground">Track all interactions with the candidate</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel: Candidate Summary */}
          <Card className="shadow-sm lg:col-span-1">
            <CardHeader>
              <CardTitle>Candidate Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xl font-bold">{candidate.name}</h3>
                <p className="text-sm text-muted-foreground">{candidate.role}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Experience</p>
                <p className="text-sm text-muted-foreground">{candidate.experience}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Skills</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {candidate.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
              <div className="pt-2 border-t space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{candidate.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{candidate.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Panel: Timeline */}
          <Card className="shadow-sm lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Timeline</CardTitle>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Note
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Note</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add your note here..." rows={4} />
                        <Button onClick={handleAddNote} className="w-full">Save Note</Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4 mr-2" />
                        Add Call
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Call Summary</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Duration</Label>
                          <Input placeholder="e.g. 30 mins" />
                        </div>
                        <div className="space-y-2">
                          <Label>Summary</Label>
                          <Textarea value={callSummary} onChange={(e) => setCallSummary(e.target.value)} placeholder="Call summary..." rows={4} />
                        </div>
                        <Button onClick={handleAddCallSummary} className="w-full">Save Call Summary</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeline.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {getIcon(item.type)}
                      </div>
                      <div className="w-0.5 h-full bg-border mt-2" />
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-sm">{item.text}</p>
                        <p className="text-xs text-muted-foreground mt-2">{item.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CommunicationTimeline;

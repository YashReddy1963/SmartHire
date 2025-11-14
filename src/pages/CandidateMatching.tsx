import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, MessageSquare, UserCheck, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CandidateMatching = () => {
  const navigate = useNavigate();
  const [scoreRange, setScoreRange] = useState([0, 100]);
  const [statusFilter, setStatusFilter] = useState("all");

  const candidates = [
    { id: 1, name: "John Doe", score: 92, skills: "JavaScript, React, Node.js", experience: "5 years", status: "Screened" },
    { id: 2, name: "Jane Smith", score: 88, skills: "Python, Django, AWS", experience: "4 years", status: "Shortlisted" },
    { id: 3, name: "Alex Johnson", score: 85, skills: "Java, Spring Boot, Microservices", experience: "6 years", status: "Applied" },
    { id: 4, name: "Sarah Williams", score: 78, skills: "React, TypeScript, Redux", experience: "3 years", status: "Interviewed" },
    { id: 5, name: "Michael Brown", score: 72, skills: "Angular, Node.js, MongoDB", experience: "4 years", status: "Applied" },
    { id: 6, name: "Emily Davis", score: 65, skills: "Vue.js, JavaScript, CSS", experience: "2 years", status: "Rejected" },
  ];

  const getStatusColor = (status: string): "default" | "destructive" | "outline" | "secondary" => {
    const colors: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
      Applied: "secondary",
      Screened: "default",
      Shortlisted: "default",
      Interviewed: "default",
      Rejected: "destructive",
    };
    return colors[status] || "secondary";
  };

  const filteredCandidates = candidates.filter(
    (c) => c.score >= scoreRange[0] && c.score <= scoreRange[1] && (statusFilter === "all" || c.status === statusFilter)
  );

  return (
    <DashboardLayout userRole="recruiter">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Candidate Matching</h1>
          <p className="text-muted-foreground">View and filter candidates by match score</p>
        </div>

        {/* Filters */}
        <Card className="shadow-sm mb-6">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Match Score Range</Label>
                <div className="pt-2">
                  <Slider value={scoreRange} onValueChange={setScoreRange} max={100} step={1} />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>{scoreRange[0]}</span>
                    <span>{scoreRange[1]}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Applied">Applied</SelectItem>
                    <SelectItem value="Screened">Screened</SelectItem>
                    <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="Interviewed">Interviewed</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Skills</Label>
                <Input placeholder="Filter by skills..." />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Candidates Table */}
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="text-left p-4 font-semibold">Candidate Name</th>
                    <th className="text-left p-4 font-semibold">Match Score</th>
                    <th className="text-left p-4 font-semibold">Skills Matched</th>
                    <th className="text-left p-4 font-semibold">Experience</th>
                    <th className="text-left p-4 font-semibold">Status</th>
                    <th className="text-left p-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCandidates.map((candidate) => (
                    <tr key={candidate.id} className="border-b hover:bg-muted/30">
                      <td className="p-4 font-medium">{candidate.name}</td>
                      <td className="p-4">
                        <Badge variant="default">{candidate.score}</Badge>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">{candidate.skills}</td>
                      <td className="p-4 text-sm">{candidate.experience}</td>
                      <td className="p-4">
                        <Badge variant={getStatusColor(candidate.status)}>{candidate.status}</Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => navigate(`/communication/${candidate.id}`)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => navigate(`/communication/${candidate.id}`)}>
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <UserCheck className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CandidateMatching;

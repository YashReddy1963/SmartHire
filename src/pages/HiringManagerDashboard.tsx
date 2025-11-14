import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Eye, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HiringManagerDashboard = () => {
  const navigate = useNavigate();

  const shortlistedCandidates = [
    {
      id: 1,
      name: "John Doe",
      score: 92,
      skills: "JavaScript, React, Node.js",
      stage: "Technical Interview",
      matchedSkills: ["JavaScript", "React", "Node.js"],
      requiredSkills: ["JavaScript", "React", "Node.js", "TypeScript"],
    },
    {
      id: 2,
      name: "Jane Smith",
      score: 88,
      skills: "Python, Django, AWS",
      stage: "Awaiting Feedback",
      matchedSkills: ["Python", "Django", "AWS"],
      requiredSkills: ["Python", "Django", "AWS", "Docker"],
    },
  ];

  const calculateSkillMatch = (matched: string[], required: string[]) => {
    return Math.round((matched.length / required.length) * 100);
  };

  return (
    <DashboardLayout userRole="hiring-manager">
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Hiring Manager Dashboard</h1>
          <p className="text-muted-foreground">Review shortlisted candidates and provide feedback</p>
        </div>

        {/* Shortlisted Candidates */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Shortlisted Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="text-left p-4 font-semibold">Name</th>
                    <th className="text-left p-4 font-semibold">Match Score</th>
                    <th className="text-left p-4 font-semibold">Skills Matched</th>
                    <th className="text-left p-4 font-semibold">Interview Stage</th>
                    <th className="text-left p-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {shortlistedCandidates.map((candidate) => (
                    <tr key={candidate.id} className="border-b hover:bg-muted/30">
                      <td className="p-4 font-medium">{candidate.name}</td>
                      <td className="p-4">
                        <Badge variant="default">{candidate.score}</Badge>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">{candidate.skills}</td>
                      <td className="p-4 text-sm">{candidate.stage}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => navigate(`/communication/${candidate.id}`)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button size="sm" onClick={() => navigate(`/feedback/${candidate.id}`)}>
                            <FileText className="h-4 w-4 mr-2" />
                            Feedback
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

        {/* Why Shortlisted Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {shortlistedCandidates.map((candidate) => (
            <Card key={candidate.id} className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Why {candidate.name} was Shortlisted?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-semibold mb-2">Top Matching Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {candidate.matchedSkills.map((skill) => (
                      <Badge key={skill} variant="default">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-2">Skill Match Percentage</p>
                  <div className="space-y-2">
                    <Progress value={calculateSkillMatch(candidate.matchedSkills, candidate.requiredSkills)} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      {calculateSkillMatch(candidate.matchedSkills, candidate.requiredSkills)}% skills matched
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-2">JD vs Candidate Comparison</p>
                  <div className="space-y-2">
                    {candidate.requiredSkills.map((skill) => {
                      const isMatched = candidate.matchedSkills.includes(skill);
                      return (
                        <div key={skill} className="flex items-center justify-between text-sm">
                          <span>{skill}</span>
                          <Badge variant={isMatched ? "default" : "secondary"}>
                            {isMatched ? "✓ Matched" : "Not matched"}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HiringManagerDashboard;

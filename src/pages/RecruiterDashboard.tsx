import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Users, CheckCircle, Clock, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecruiterDashboard = () => {
  const navigate = useNavigate();

  const summaryCards = [
    { title: "Open Jobs", value: "12", icon: Briefcase, color: "text-primary" },
    { title: "Active Candidates", value: "87", icon: Users, color: "text-info" },
    { title: "Tasks Today", value: "6", icon: CheckCircle, color: "text-warning" },
    { title: "Avg. Days to Hire", value: "24", icon: Clock, color: "text-success" },
  ];

  const openJobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      applications: 24,
      pipeline: { applied: 24, screened: 12, shortlisted: 6, interviewed: 3, hired: 0 },
    },
    {
      id: 2,
      title: "Product Manager",
      applications: 18,
      pipeline: { applied: 18, screened: 10, shortlisted: 5, interviewed: 2, hired: 1 },
    },
    {
      id: 3,
      title: "Sales Executive",
      applications: 32,
      pipeline: { applied: 32, screened: 15, shortlisted: 8, interviewed: 4, hired: 0 },
    },
  ];

  const tasks = [
    { id: 1, text: "Call candidate - John Doe", urgent: true },
    { id: 2, text: "Collect feedback from hiring manager", urgent: false },
    { id: 3, text: "Share shortlisted candidates with team", urgent: true },
    { id: 4, text: "Schedule interview - Jane Smith", urgent: false },
  ];

  return (
    <DashboardLayout userRole="recruiter">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your recruitment overview.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCards.map((card) => (
            <Card key={card.title} className="shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{card.title}</p>
                    <p className="text-3xl font-bold mt-1">{card.value}</p>
                  </div>
                  <card.icon className={`h-8 w-8 ${card.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Open Jobs */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Open Jobs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {openJobs.map((job) => (
              <div key={job.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{job.title}</h3>
                  <Badge variant="secondary">{job.applications} Applications</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Pipeline:</span>
                  <Badge variant="outline">Applied: {job.pipeline.applied}</Badge>
                  <Badge variant="outline">Screened: {job.pipeline.screened}</Badge>
                  <Badge variant="outline">Shortlisted: {job.pipeline.shortlisted}</Badge>
                  <Badge variant="outline">Interviewed: {job.pipeline.interviewed}</Badge>
                  <Badge variant="outline">Hired: {job.pipeline.hired}</Badge>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => navigate("/candidates")}
                  className="w-full sm:w-auto"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Pipeline
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Tasks & Reminders */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Tasks & Reminders</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {tasks.map((task) => (
                <li key={task.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50">
                  <input type="checkbox" className="h-4 w-4" />
                  <span className={task.urgent ? "font-medium" : ""}>{task.text}</span>
                  {task.urgent && (
                    <Badge variant="destructive" className="ml-auto">Urgent</Badge>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RecruiterDashboard;

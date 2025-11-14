import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Check } from "lucide-react";
import { toast } from "sonner";

const ResumeParser = () => {
  const [uploadedResumes] = useState([
    { id: 1, filename: "john_doe_resume.pdf", status: "Parsed" },
    { id: 2, filename: "jane_smith_resume.pdf", status: "Parsed" },
    { id: 3, filename: "alex_johnson_resume.pdf", status: "Pending" },
  ]);

  const [selectedResume, setSelectedResume] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+91-9876543210",
    experience: "5 years",
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "TypeScript", "REST APIs"],
    education: "B.Tech Computer Science - IIT Delhi (2018)",
  });

  const handleUpload = () => {
    toast.success("Resume uploaded successfully!");
  };

  const handleAddToPipeline = () => {
    toast.success("Candidate added to pipeline!");
  };

  return (
    <DashboardLayout userRole="recruiter">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Resume Parser</h1>
          <p className="text-muted-foreground">Upload and parse candidate resumes</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel: Upload */}
          <div className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Upload Resume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer" onClick={handleUpload}>
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">PDF, DOC, DOCX (Max 10MB)</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Uploaded Resumes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {uploadedResumes.map((resume) => (
                    <li key={resume.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer" onClick={() => setSelectedResume(selectedResume)}>
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">{resume.filename}</span>
                      </div>
                      <Badge variant={resume.status === "Parsed" ? "default" : "secondary"}>
                        {resume.status === "Parsed" && <Check className="h-3 w-3 mr-1" />}
                        {resume.status}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel: Preview */}
          <div>
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Parsed Resume Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{selectedResume.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedResume.email}</p>
                  <p className="text-sm text-muted-foreground">{selectedResume.phone}</p>
                </div>

                <div>
                  <Label className="text-sm font-semibold">Total Experience</Label>
                  <p className="text-sm mt-1">{selectedResume.experience}</p>
                </div>

                <div>
                  <Label className="text-sm font-semibold">Skills Extracted</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedResume.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-semibold">Education</Label>
                  <p className="text-sm mt-1">{selectedResume.education}</p>
                </div>

                <Button onClick={handleAddToPipeline} className="w-full" size="lg">
                  Add to Pipeline
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const Label = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={className}>{children}</div>
);

export default ResumeParser;

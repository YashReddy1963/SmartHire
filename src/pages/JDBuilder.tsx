import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { toast } from "sonner";

const templates = {
  "Software Engineer": ["JavaScript", "React", "Node.js", "TypeScript", "REST APIs"],
  "Sales Executive": ["CRM", "Lead Generation", "Negotiation", "Communication", "Target Achievement"],
  "HR Recruiter": ["Talent Acquisition", "Interviewing", "ATS", "LinkedIn Recruiting", "Communication"],
  "Marketing": ["Digital Marketing", "SEO", "Content Strategy", "Analytics", "Social Media"],
};

const JDBuilder = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState<Array<{ name: string; weight: number }>>([]);
  const [newSkill, setNewSkill] = useState("");

  const applyTemplate = (templateName: keyof typeof templates) => {
    const templateSkills = templates[templateName];
    setSkills(templateSkills.map(skill => ({ name: skill, weight: 5 })));
    toast.success(`Applied ${templateName} template`);
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, { name: newSkill.trim(), weight: 5 }]);
      setNewSkill("");
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const updateSkillWeight = (index: number, weight: number) => {
    const updated = [...skills];
    updated[index].weight = weight;
    setSkills(updated);
  };

  const generateJD = () => {
    toast.success("Job Description generated successfully!");
  };

  return (
    <DashboardLayout userRole="recruiter">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">JD Builder</h1>
          <p className="text-muted-foreground">Create structured job descriptions with skill requirements</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Form */}
          <div className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input id="title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="e.g. Senior Software Engineer" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience (Years)</Label>
                  <Input id="experience" type="number" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="e.g. 5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Bangalore" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobType">Job Type</Label>
                  <Select value={jobType} onValueChange={setJobType}>
                    <SelectTrigger id="jobType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Job responsibilities and requirements..." rows={4} />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Skill Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(templates).map((template) => (
                    <Button key={template} variant="outline" onClick={() => applyTemplate(template as keyof typeof templates)}>
                      {template}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Skill Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Add skill" onKeyPress={(e) => e.key === 'Enter' && addSkill()} />
                  <Button onClick={addSkill}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {skills.map((skill, index) => (
                    <div key={index} className="border rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <Button variant="ghost" size="sm" onClick={() => removeSkill(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <Label>Weightage</Label>
                          <span className="text-muted-foreground">{skill.weight}/10</span>
                        </div>
                        <Slider value={[skill.weight]} onValueChange={(v) => updateSkillWeight(index, v[0])} max={10} step={1} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button onClick={generateJD} className="w-full" size="lg">
              Generate JD
            </Button>
          </div>

          {/* Right: Preview */}
          <div>
            <Card className="shadow-sm sticky top-6">
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {jobTitle && <h2 className="text-2xl font-bold">{jobTitle}</h2>}
                {(experience || location || jobType) && (
                  <div className="flex flex-wrap gap-2">
                    {experience && <Badge variant="secondary">{experience} years</Badge>}
                    {location && <Badge variant="secondary">{location}</Badge>}
                    {jobType && <Badge variant="secondary">{jobType}</Badge>}
                  </div>
                )}
                {description && (
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </div>
                )}
                {skills.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Required Skills</h3>
                    <ul className="space-y-1">
                      {skills.map((skill, index) => (
                        <li key={index} className="text-sm flex items-center justify-between">
                          <span>{skill.name}</span>
                          <span className="text-muted-foreground">Weight: {skill.weight}/10</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JDBuilder;

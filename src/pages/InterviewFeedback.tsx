import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";

const InterviewFeedback = () => {
  const { candidateId } = useParams();
  const navigate = useNavigate();
  const [communication, setCommunication] = useState([7]);
  const [technical, setTechnical] = useState([8]);
  const [cultureFit, setCultureFit] = useState([6]);
  const [recommendation, setRecommendation] = useState("yes");
  const [comments, setComments] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    toast.success("Feedback submitted successfully!");
    setTimeout(() => {
      navigate("/hiring-manager");
    }, 2000);
  };

  return (
    <DashboardLayout userRole="hiring-manager">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Interview Feedback</h1>
          <p className="text-muted-foreground">Provide feedback for the candidate interview</p>
        </div>

        <Card className="shadow-sm max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Feedback Form - John Doe</CardTitle>
            <p className="text-sm text-muted-foreground">Position: Senior Software Engineer</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label>Communication Skill</Label>
                <Slider value={communication} onValueChange={setCommunication} max={10} step={1} />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Poor</span>
                  <span className="font-medium text-foreground">{communication[0]}/10</span>
                  <span>Excellent</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Technical Skill</Label>
                <Slider value={technical} onValueChange={setTechnical} max={10} step={1} />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Poor</span>
                  <span className="font-medium text-foreground">{technical[0]}/10</span>
                  <span>Excellent</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Culture Fit</Label>
                <Slider value={cultureFit} onValueChange={setCultureFit} max={10} step={1} />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Poor</span>
                  <span className="font-medium text-foreground">{cultureFit[0]}/10</span>
                  <span>Excellent</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Recommendation</Label>
                <RadioGroup value={recommendation} onValueChange={setRecommendation}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes" className="font-normal cursor-pointer">Yes, proceed to next round</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no" className="font-normal cursor-pointer">No, not suitable</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label htmlFor="comments">Comments</Label>
                <Textarea
                  id="comments"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Share your detailed feedback..."
                  rows={5}
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                Submit Feedback
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Success Dialog */}
        <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-success">
                <CheckCircle className="h-6 w-6" />
                Feedback Saved!
              </DialogTitle>
            </DialogHeader>
            <p className="text-muted-foreground">Your feedback has been successfully submitted and shared with the team.</p>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default InterviewFeedback;

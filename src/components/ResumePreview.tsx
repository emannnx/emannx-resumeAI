
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Star, User, Award, Calendar } from "lucide-react";

// Define interfaces
export interface CustomizationOptions {
  colorScheme: string;
  fontSize: number;
  spacing: number;
  fontFamily: string;
  accentColor: string;
}

interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  skills: string[];
}

interface ResumePreviewProps {
  resumeData: ResumeData;
  customization: CustomizationOptions;
  cvType: "header" | "full";
}

const fontFamilyMap: Record<string, string> = {
  inter: "'Inter', sans-serif",
  georgia: "'Georgia', serif",
  roboto: "'Roboto', sans-serif",
  playfair: "'Playfair Display', serif",
  montserrat: "'Montserrat', sans-serif",
};

const ResumePreview = ({ resumeData, customization, cvType }: ResumePreviewProps) => {
  // Ultra-compact spacing for professional look
  const spacing = {
    section: `${customization.spacing * 0.5}rem`,
    subsection: `${customization.spacing * 0.3}rem`,
    item: `${customization.spacing * 0.2}rem`,
    element: `${customization.spacing * 0.1}rem`,
  };

  // Smaller, more professional font sizes
  const fonts = {
    name: Math.max(18, customization.fontSize + 4),
    title: Math.max(14, customization.fontSize + 2),
    section: Math.max(12, customization.fontSize),
    body: Math.max(10, customization.fontSize - 2),
    small: Math.max(9, customization.fontSize - 3),
    micro: Math.max(8, customization.fontSize - 4),
  };

  const containerStyle = {
    fontFamily: fontFamilyMap[customization.fontFamily],
    fontSize: `${fonts.body}px`,
    lineHeight: 1.3,
    letterSpacing: '0.02em',
  };

  const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div 
      className="flex items-center gap-2 mb-3 border-b pb-1"
      style={{ 
        marginBottom: spacing.subsection,
        borderColor: `${customization.accentColor}30`
      }}
    >
      <Icon className="w-3 h-3" style={{ color: customization.accentColor }} />
      <h2 
        className="font-semibold uppercase tracking-widest"
        style={{ 
          color: customization.accentColor,
          fontSize: `${fonts.section}px`,
          letterSpacing: '0.1em'
        }}
      >
        {title}
      </h2>
    </div>
  );

  return (
    <Card id="resume-preview" className="p-6 bg-white shadow-lg border min-h-[600px] max-w-4xl mx-auto">
      <div style={containerStyle} className="text-gray-800">
        
        {/* Compact Header Section */}
        <div className="mb-6" style={{ marginBottom: spacing.section }}>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 
                className="font-bold text-gray-900 mb-1"
                style={{ 
                  fontSize: `${fonts.name}px`,
                  marginBottom: spacing.element
                }}
              >
                {resumeData.personalInfo.fullName || "Your Name"}
              </h1>
              {cvType === "header" && resumeData.personalInfo.summary && (
                <p 
                  className="text-gray-600 leading-relaxed"
                  style={{ fontSize: `${fonts.small}px` }}
                >
                  {resumeData.personalInfo.summary}
                </p>
              )}
            </div>
            
            {/* Compact Contact Info */}
            <div className="text-right space-y-1 ml-4 min-w-[180px]" style={{ gap: spacing.element }}>
              {resumeData.personalInfo.email && (
                <div className="flex items-center justify-end gap-1 text-gray-600" style={{ fontSize: `${fonts.micro}px` }}>
                  <Mail className="w-3 h-3" />
                  <span>{resumeData.personalInfo.email}</span>
                </div>
              )}
              {resumeData.personalInfo.phone && (
                <div className="flex items-center justify-end gap-1 text-gray-600" style={{ fontSize: `${fonts.micro}px` }}>
                  <Phone className="w-3 h-3" />
                  <span>{resumeData.personalInfo.phone}</span>
                </div>
              )}
              {resumeData.personalInfo.location && (
                <div className="flex items-center justify-end gap-1 text-gray-600" style={{ fontSize: `${fonts.micro}px` }}>
                  <MapPin className="w-3 h-3" />
                  <span>{resumeData.personalInfo.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills for header CV */}
          {cvType === "header" && resumeData.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {resumeData.skills.slice(0, 8).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 rounded border font-medium"
                  style={{ 
                    borderColor: `${customization.accentColor}40`,
                    color: customization.accentColor,
                    backgroundColor: `${customization.accentColor}08`,
                    fontSize: `${fonts.micro}px`
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {cvType === "full" && (
          <div className="grid grid-cols-12 gap-6" style={{ gap: spacing.section }}>
            
            {/* Left Column - 5/12 */}
            <div className="col-span-5 space-y-5" style={{ gap: spacing.section }}>
              
              {/* Profile Summary */}
              {resumeData.personalInfo.summary && (
                <div>
                  <SectionHeader icon={User} title="Profile" />
                  <p 
                    className="text-gray-700 leading-relaxed"
                    style={{ fontSize: `${fonts.small}px` }}
                  >
                    {resumeData.personalInfo.summary}
                  </p>
                </div>
              )}

              {/* Skills */}
              {resumeData.skills.length > 0 && (
                <div>
                  <SectionHeader icon={Award} title="Skills" />
                  <div className="grid grid-cols-2 gap-1.5" style={{ gap: spacing.item }}>
                    {resumeData.skills.map((skill, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-1.5 py-0.5"
                      >
                        <div 
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: customization.accentColor }}
                        />
                        <span 
                          className="text-gray-700"
                          style={{ fontSize: `${fonts.small}px` }}
                        >
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {resumeData.education.some(edu => edu.degree || edu.institution) && (
                <div>
                  <SectionHeader icon={GraduationCap} title="Education" />
                  <div className="space-y-3" style={{ gap: spacing.subsection }}>
                    {resumeData.education
                      .filter(edu => edu.degree || edu.institution)
                      .map((edu, index) => (
                        <div key={index}>
                          <h3 
                            className="font-semibold text-gray-900 mb-0.5"
                            style={{ fontSize: `${fonts.small}px` }}
                          >
                            {edu.degree}
                          </h3>
                          <div className="flex justify-between items-center text-gray-600">
                            <span style={{ fontSize: `${fonts.micro}px` }}>{edu.institution}</span>
                            <div className="flex items-center gap-0.5" style={{ fontSize: `${fonts.micro}px` }}>
                              <Calendar className="w-2.5 h-2.5" />
                              <span>{edu.year}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - 7/12 */}
            <div className="col-span-7">
              {resumeData.experience.some(exp => exp.title || exp.company) && (
                <div>
                  <SectionHeader icon={Briefcase} title="Experience" />
                  <div className="space-y-4" style={{ gap: spacing.subsection }}>
                    {resumeData.experience
                      .filter(exp => exp.title || exp.company)
                      .map((exp, index) => (
                        <div key={index} className="flex">
                          {/* Timeline */}
                          <div className="flex flex-col items-center mr-3 mt-0.5">
                            <div 
                              className="w-2 h-2 rounded-full border-2 flex-shrink-0"
                              style={{ 
                                borderColor: customization.accentColor,
                                backgroundColor: 'white'
                              }}
                            />
                            {index < resumeData.experience.length - 1 && (
                              <div 
                                className="w-0.5 h-full mt-1"
                                style={{ backgroundColor: `${customization.accentColor}20` }}
                              />
                            )}
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 pb-3">
                            <div className="flex justify-between items-start mb-1">
                              <div>
                                <h3 
                                  className="font-semibold text-gray-900"
                                  style={{ fontSize: `${fonts.small}px` }}
                                >
                                  {exp.title}
                                </h3>
                                <div 
                                  className="text-gray-700 font-medium"
                                  style={{ fontSize: `${fonts.micro}px` }}
                                >
                                  {exp.company}
                                </div>
                              </div>
                              <span 
                                className="px-1.5 py-0.5 rounded text-white font-medium whitespace-nowrap flex-shrink-0 ml-2"
                                style={{ 
                                  backgroundColor: customization.accentColor,
                                  fontSize: `${fonts.micro}px`
                                }}
                              >
                                {exp.duration}
                              </span>
                            </div>
                            
                            {exp.description && (
                              <p 
                                className="text-gray-600 mt-1 leading-relaxed"
                                style={{ fontSize: `${fonts.small}px` }}
                              >
                                {exp.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Ultra-compact Header-only Layout */}
        {cvType === "header" && (
          <div className="space-y-6" style={{ gap: spacing.section }}>
            {/* Experience for header CV */}
            {resumeData.experience.some(exp => exp.title || exp.company) && (
              <div>
                <SectionHeader icon={Briefcase} title="Experience" />
                <div className="grid grid-cols-2 gap-3" style={{ gap: spacing.subsection }}>
                  {resumeData.experience
                    .filter(exp => exp.title || exp.company)
                    .slice(0, 4)
                    .map((exp, index) => (
                      <div key={index} className="border-l-2 pl-2" style={{ borderColor: customization.accentColor }}>
                        <h3 
                          className="font-semibold text-gray-900 mb-0.5"
                          style={{ fontSize: `${fonts.small}px` }}
                        >
                          {exp.title}
                        </h3>
                        <div 
                          className="text-gray-700 mb-0.5"
                          style={{ fontSize: `${fonts.micro}px` }}
                        >
                          {exp.company}
                        </div>
                        <div 
                          className="text-gray-500 mb-1"
                          style={{ fontSize: `${fonts.micro}px` }}
                        >
                          {exp.duration}
                        </div>
                        {exp.description && (
                          <p 
                            className="text-gray-600 leading-relaxed"
                            style={{ fontSize: `${fonts.small}px` }}
                          >
                            {exp.description.substring(0, 120)}...
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Education for header CV */}
            {resumeData.education.some(edu => edu.degree || edu.institution) && (
              <div>
                <SectionHeader icon={GraduationCap} title="Education" />
                <div className="flex flex-wrap gap-2">
                  {resumeData.education
                    .filter(edu => edu.degree || edu.institution)
                    .map((edu, index) => (
                      <div 
                        key={index}
                        className="px-2 py-1 rounded border"
                        style={{ 
                          borderColor: `${customization.accentColor}30`,
                          fontSize: `${fonts.micro}px`
                        }}
                      >
                        <span className="font-medium">{edu.degree}</span>
                        <span className="text-gray-500"> • {edu.institution} • {edu.year}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Skills for header CV */}
            {resumeData.skills.length > 0 && (
              <div>
                <SectionHeader icon={Star} title="Technical Skills" />
                <div className="flex flex-wrap gap-1">
                  {resumeData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-1.5 py-0.5 rounded border"
                      style={{ 
                        borderColor: `${customization.accentColor}30`,
                        color: customization.accentColor,
                        backgroundColor: `${customization.accentColor}08`,
                        fontSize: `${fonts.micro}px`
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ResumePreview;
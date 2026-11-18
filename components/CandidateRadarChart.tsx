'use client';

import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer, 
  Legend, 
  Tooltip 
} from 'recharts';
import { CandidateApplication } from '@/lib/types';

interface CandidateRadarChartProps {
  candidate: CandidateApplication;
}

export default function CandidateRadarChart({ candidate }: CandidateRadarChartProps) {
  // Map candidate evaluations to 5 standard normalized dimensions (0-100%)
  const s1 = candidate.stageEvaluations.find((e) => e.stageId === 1)?.totalScore || 0;
  const s2 = candidate.stageEvaluations.find((e) => e.stageId === 2)?.totalScore || 0;
  const s3 = candidate.stageEvaluations.find((e) => e.stageId === 3)?.totalScore || 0;
  const s4 = candidate.stageEvaluations.find((e) => e.stageId === 4)?.totalScore || 0;
  const s5 = candidate.stageEvaluations.find((e) => e.stageId === 5)?.totalScore || 0;

  // Normalized to 0-100 scale
  const normS1 = Math.round((s1 / 100) * 100);
  const normS2 = Math.round((s2 / 250) * 100);
  const normS3 = Math.round((s3 / 300) * 100);
  const normS4 = Math.round((s4 / 200) * 100);
  const normS5 = s5 > 0 ? Math.round((s5 / 150) * 100) : 0;

  const data = [
    {
      subject: 'Proof of Work (S1)',
      Candidate: normS1,
      'Cohort Avg': 78,
      'Top 10% Benchmark': 94,
      fullMark: 100
    },
    {
      subject: 'Practical Code (S2)',
      Candidate: normS2,
      'Cohort Avg': 74,
      'Top 10% Benchmark': 95,
      fullMark: 100
    },
    {
      subject: 'Domain Depth (S3)',
      Candidate: normS3,
      'Cohort Avg': 71,
      'Top 10% Benchmark': 92,
      fullMark: 100
    },
    {
      subject: 'System Design (S4)',
      Candidate: normS4,
      'Cohort Avg': 69,
      'Top 10% Benchmark': 91,
      fullMark: 100
    },
    {
      subject: 'Bar-Raiser (S5)',
      Candidate: normS5,
      'Cohort Avg': 67,
      'Top 10% Benchmark': 88,
      fullMark: 100
    }
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#27272a" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#a1a1aa', fontSize: 10 }} 
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={{ fill: '#71717a', fontSize: 9 }} 
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#09090b',
              borderColor: '#27272a',
              borderRadius: '8px',
              fontSize: '11px',
              color: '#f4f4f5'
            }}
          />
          <Radar
            name="This Candidate"
            dataKey="Candidate"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.45}
          />
          <Radar
            name="Top 10% Benchmark"
            dataKey="Top 10% Benchmark"
            stroke="#06b6d4"
            fill="#06b6d4"
            fillOpacity={0.15}
          />
          <Radar
            name="Cohort Average"
            dataKey="Cohort Avg"
            stroke="#71717a"
            fill="#71717a"
            fillOpacity={0.1}
          />
          <Legend 
            wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

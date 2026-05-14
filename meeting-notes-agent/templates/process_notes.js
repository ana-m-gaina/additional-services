'use strict';
const fs   = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun,
  BorderStyle, ShadingType,
  AlignmentType, Header, Footer, PageNumber,
  TabStopType,
} = require('docx');

const ROOT    = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'output');
const D       = JSON.parse(fs.readFileSync(path.join(ROOT, 'config', 'design_config.json'), 'utf8'));
const C    = D.colors;
const T    = D.typography;
const COMP = D.components;
const FONT = D.document.font || 'Arial';
const CA   = C.analysis || {};

const hx = c => (c || '#000000').replace('#', '');
const hp = pt => pt * 2;

const FLAG_MAP = {
  'Top Issue': C.flags.topIssue, 'Action': C.flags.action,
  'Risk': C.flags.risk, 'Info': C.flags.info,
  'Monitoring': C.flags.monitoring, 'Closed': C.flags.closed,
};
const STATUS_MAP = {
  'In Progress': C.statusBadges.inProgress, 'Blocked': C.statusBadges.blocked,
  'Completed': C.statusBadges.completedClosed, 'Closed': C.statusBadges.completedClosed,
  'Monitoring': C.statusBadges.monitoring,
};

function shading(fill) { return { type: ShadingType.CLEAR, fill: hx(fill), color: 'auto' }; }
function spacer(before = 60, after = 60) { return new Paragraph({ spacing: { before, after }, children: [] }); }
function topicDivider() {
  const td = C.topicDivider;
  return new Paragraph({ spacing: { before: td.space * 20 || 240, after: td.space * 20 || 240 },
    border: { bottom: { style: BorderStyle.SINGLE, size: td.size || 8, color: hx(td.color), space: 4 } }, children: [] });
}

function analysisSectionHeading(title) {
  return new Paragraph({ spacing: { before: 300, after: 60 },
    border: { bottom: { style: BorderStyle.SINGLE, size: T.sectionHeading.bottomBorder.size, color: hx(T.sectionHeading.bottomBorder.color), space: 4 } },
    children: [new TextRun({ text: title, font: FONT, size: hp(T.sectionHeading.size), bold: true, color: hx(T.sectionHeading.color) })] });
}
function analysisBullet(text, color = '#333333') {
  return new Paragraph({ spacing: { before: 10, after: 10 }, indent: { left: 360 },
    children: [new TextRun({ text: '\u2022 ' + text, font: FONT, size: hp(11), color: hx(color) })] });
}
function analysisLine(label, value, valueColor) {
  return new Paragraph({ spacing: { before: 8, after: 8 }, indent: { left: 360 },
    children: [
      new TextRun({ text: label + ': ', font: FONT, size: hp(11), color: hx('#666666') }),
      new TextRun({ text: value, font: FONT, size: hp(11), bold: true, color: hx(valueColor || '#333333') }),
    ] });
}
function analysisSubHeading(text) {
  return new Paragraph({ spacing: { before: 80, after: 20 },
    children: [new TextRun({ text, font: FONT, size: hp(12), bold: true, color: hx('#333333') })] });
}

// Badges
function flagRun(flag) {
  const col = FLAG_MAP[flag] || FLAG_MAP['Info'];
  return new TextRun({ text: ' ' + flag + ' ', font: FONT, size: hp(T.flagBadge.size), bold: true, color: hx(col.text), shading: shading(col.background) });
}
function flagsPara(flags) {
  if (!flags || !flags.length) return null;
  const runs = [];
  flags.forEach((f, i) => { if (i > 0) runs.push(new TextRun({ text: '  ', font: FONT, size: hp(T.flagBadge.size) })); runs.push(flagRun(f)); });
  return new Paragraph({ spacing: { before: 40, after: 40 }, children: runs });
}
function statusRun(status) {
  const col = STATUS_MAP[status] || STATUS_MAP['In Progress'];
  return new TextRun({ text: ' ' + status + ' ', font: FONT, size: hp(T.statusBadge.size), bold: true, color: hx(col.text), shading: shading(col.background) });
}

// Metadata
function statusLine(status, owner, due) {
  const runs = [statusRun(status), new TextRun({ text: '   ', font: FONT, size: hp(11) })];
  if (owner) runs.push(new TextRun({ text: owner, font: FONT, size: hp(T.statusLineOwner.size), color: hx(T.statusLineOwner.color) }));
  if (due) {
    runs.push(new TextRun({ text: COMP.topicAggregate.statusLineSeparator, font: FONT, size: hp(11), color: hx(T.statusLineSeparator.color) }));
    runs.push(new TextRun({ text: COMP.topicAggregate.dueLabelPrefix, font: FONT, size: hp(T.statusLineDueLabel.size), color: hx(T.statusLineDueLabel.color) }));
    runs.push(new TextRun({ text: due, font: FONT, size: hp(T.statusLineDueValue.size), bold: true, color: hx(T.statusLineDueValue.color) }));
  }
  return new Paragraph({ spacing: { before: 40, after: 40 }, children: runs });
}
function metaLine(pairs) {
  const runs = [];
  pairs.forEach(([label, value, color], i) => {
    runs.push(new TextRun({ text: label + ': ', font: FONT, size: hp(T.subTopicMetadataLabel.size), color: hx(T.subTopicMetadataLabel.color) }));
    runs.push(new TextRun({ text: value, font: FONT, size: hp(T.subTopicMetadataValue.size), bold: true, color: hx(color || T.subTopicMetadataValue.color) }));
    if (i < pairs.length - 1) runs.push(new TextRun({ text: '    ', font: FONT, size: hp(14) }));
  });
  return new Paragraph({ spacing: { before: 20, after: 20 }, children: runs });
}

// Colored sections
function summaryPara(text) {
  if (!text) return [];
  return [new Paragraph({ spacing: { before: 40, after: 40 }, shading: shading(C.topicComponents.summaryBackground),
    children: [new TextRun({ text: '  ' + text, font: FONT, size: hp(T.summaryText.size), color: hx(T.summaryText.color) })] })];
}
function decisionsSection(decisions, indent = 360) {
  if (!decisions || !decisions.length) return [];
  const result = [new Paragraph({ spacing: { before: 80, after: 20 }, shading: shading(C.topicComponents.decisionsBackground),
    children: [new TextRun({ text: '  ' + COMP.decisionsSection.header, font: FONT, size: hp(T.decisionsHeader.size), bold: true, color: hx(T.decisionsHeader.color) })] })];
  for (const d of decisions) {
    const dateStr = d.date ? '  (' + d.date + ')' : '';
    result.push(new Paragraph({ spacing: { before: 10, after: 10 }, indent: { left: indent }, children: [
      new TextRun({ text: COMP.decisionsSection.checkmark + ' ', font: FONT, size: hp(T.decisionsItem.size), bold: true, color: hx(T.decisionsItem.checkmarkColor) }),
      new TextRun({ text: d.text, font: FONT, size: hp(T.decisionsItem.size), color: hx(T.decisionsItem.color) }),
      new TextRun({ text: dateStr, font: FONT, size: hp(T.decisionsItem.size), color: hx('#999999'), italics: true }),
    ] }));
  }
  return result;
}
function sharedUpdatesSection(updates) {
  if (!updates || !updates.length) return [];
  const result = [new Paragraph({ spacing: { before: 80, after: 20 }, shading: shading(C.topicComponents.sharedUpdatesBackground),
    children: [new TextRun({ text: '  ' + COMP.sharedUpdatesSection.header, font: FONT, size: hp(T.sharedUpdatesHeader.size), bold: true, color: hx(T.sharedUpdatesHeader.color) })] })];
  for (const u of updates) {
    result.push(new Paragraph({ spacing: { before: 10, after: 10 }, indent: { left: 360 },
      children: [new TextRun({ text: COMP.sharedUpdatesSection.bulletChar + ' ' + u.text, font: FONT, size: hp(T.sharedUpdatesItem.size), color: hx(T.sharedUpdatesItem.color) })] }));
  }
  return result;
}

// Overview
function overviewSection(topic) {
  const subs = topic.subTopics || [];
  if (!subs.length) return [];
  const result = [new Paragraph({ spacing: { before: 80, after: 20 }, shading: shading(C.topicComponents.overviewBackground),
    children: [new TextRun({ text: '  Overview', font: FONT, size: hp(T.overviewHeader.size), bold: true, color: hx(T.overviewHeader.color) })] })];
  for (let i = 0; i < subs.length; i++) {
    const st = subs[i]; const num = (topic.id || '') + '.' + (i + 1);
    result.push(new Paragraph({ spacing: { before: 15, after: 15 }, indent: { left: 300 }, children: [
      new TextRun({ text: num, font: T.overviewSubTopicId.font || 'Consolas', size: hp(T.overviewSubTopicId.size), bold: true, color: hx(T.overviewSubTopicId.color) }),
      new TextRun({ text: '   ', font: FONT, size: hp(14) }), statusRun(st.status),
      new TextRun({ text: '   ' + (st.owner || 'TBD') + '  \u2192 ' + (st.due || 'TBD') + (st.title ? '   ' + st.title : ''), font: FONT, size: hp(T.overviewSubTopicMeta.size), color: hx(T.overviewSubTopicMeta.color) }),
    ] }));
  }
  const counts = {}; const owners = []; const dues = [];
  for (const st of subs) { counts[st.status] = (counts[st.status] || 0) + 1; if (st.owner && st.owner !== 'TBD' && !owners.includes(st.owner)) owners.push(st.owner); if (st.due && st.due !== 'TBD') dues.push(st.due); }
  const parts = [Object.entries(counts).map(([s, n]) => n + ' ' + s).join(COMP.sectionAggregate.summaryCountSeparator), owners.join(', ') || 'TBD', dues.length ? COMP.sectionAggregate.nextDuePrefix + dues[0] : ''].filter(Boolean);
  result.push(new Paragraph({ spacing: { before: 30, after: 40 }, indent: { left: 300 },
    children: [new TextRun({ text: parts.join(COMP.sectionAggregate.summaryCountSeparator), font: FONT, size: hp(T.summaryCountLine.size), bold: true, color: hx(T.summaryCountLine.color) })] }));
  return result;
}

// Timeline
function timelineParas(timeline, isSubTopic = false) {
  if (!timeline) return [];
  const result = []; const { current = [], earlier = [] } = timeline;
  const indent = isSubTopic ? 600 : 360; const subIndent = isSubTopic ? 900 : 720;

  function renderEntries(entries, bulletStyle, subBulletStyle) {
    for (const entry of entries) {
      if (entry.date) result.push(new Paragraph({ spacing: { before: 30, after: 10 }, indent: { left: indent }, children: [new TextRun({ text: entry.date, font: FONT, size: hp(bulletStyle === T.currentBullets ? T.timelineDates.size : T.timelineEarlierDates.size), bold: true, color: hx(bulletStyle === T.currentBullets ? T.timelineDates.color : T.timelineEarlierDates.color) })] }));
      for (const bullet of (entry.bullets || [])) {
        const lines = bullet.split('\n');
        result.push(new Paragraph({ spacing: { before: 10, after: 10 }, indent: { left: indent }, children: [new TextRun({ text: '\u2022 ' + lines[0], font: FONT, size: hp(bulletStyle.size), color: hx(bulletStyle.color) })] }));
        for (let i = 1; i < lines.length; i++) { if (lines[i].trim()) result.push(new Paragraph({ spacing: { before: 5, after: 5 }, indent: { left: subIndent }, children: [new TextRun({ text: '\u25E6 ' + lines[i].trim(), font: FONT, size: hp(subBulletStyle.size), color: hx(subBulletStyle.color) })] })); }
      }
    }
  }

  if (current.length) {
    result.push(new Paragraph({ spacing: { before: 60, after: 20 }, children: [new TextRun({ text: 'Current', font: FONT, size: hp(T.timelineCurrentLabel.size), bold: true, color: hx(T.timelineCurrentLabel.color) })] }));
    renderEntries(current, T.currentBullets, T.currentSubBullets);
  }
  if (earlier.length) {
    result.push(new Paragraph({ spacing: { before: 60, after: 20 }, children: [new TextRun({ text: 'Earlier', font: FONT, size: hp(T.timelineEarlierLabel.size), bold: true, color: hx(T.timelineEarlierLabel.color) })] }));
    renderEntries(earlier, T.earlierBullets, T.earlierSubBullets);
  }
  return result;
}

// Sub-topic card
function subTopicCard(subTopic, parentId, index) {
  const result = []; const num = (parentId || '') + '.' + index;
  result.push(new Paragraph({ spacing: { before: 100, after: 20 },
    border: { top: { style: BorderStyle.SINGLE, size: C.subTopicCard.dividerSize || 4, color: hx(C.subTopicCard.dividerBorder), space: 8 } },
    children: [
      new TextRun({ text: num + ' ', font: FONT, size: hp(T.subTopicId.size), bold: true, color: hx(T.subTopicId.color) }),
      new TextRun({ text: subTopic.id, font: T.subTopicId.font || 'Consolas', size: hp(T.subTopicId.size), bold: true, color: hx(T.subTopicId.color) }),
      new TextRun({ text: '   ', font: FONT, size: hp(T.subTopicId.size) }), statusRun(subTopic.status),
    ] }));
  result.push(new Paragraph({ spacing: { before: 10, after: 15 }, children: [new TextRun({ text: subTopic.title || '', font: FONT, size: hp(T.subTopicTitle.size), bold: true, color: hx(T.subTopicTitle.color) })] }));
  const pairs = []; if (subTopic.systems && subTopic.systems.length) pairs.push(['Systems', subTopic.systems.join(', ')]); if (subTopic.owner) pairs.push(['Owner', subTopic.owner]); if (pairs.length) result.push(metaLine(pairs));
  const pairs2 = []; if (subTopic.due) pairs2.push(['Due', subTopic.due]); if (subTopic.expiry) pairs2.push(['Expires', subTopic.expiry, C.subTopicCard.expiryText]); if (pairs2.length) result.push(metaLine(pairs2));
  result.push(...decisionsSection(subTopic.decisions, 600));
  result.push(...timelineParas(subTopic.timeline, true));
  return result;
}

// Full topic
function buildTopic(topic) {
  const paras = [];
  const titleText = topic.id ? topic.id + '. ' + (topic.title || '') : (topic.title || '(no title)');
  paras.push(new Paragraph({ spacing: { before: 80, after: 30 }, children: [new TextRun({ text: titleText, font: FONT, size: hp(T.topicTitle.size), bold: true, color: hx(T.topicTitle.color) })] }));
  const fp = flagsPara(topic.flags); if (fp) paras.push(fp);
  if (topic.references) paras.push(new Paragraph({ spacing: { before: 10, after: 20 }, children: [new TextRun({ text: topic.references, font: FONT, size: hp(T.references.size), color: hx(T.references.color), italics: T.references.italics || false })] }));
  paras.push(statusLine(topic.status, topic.owner, topic.due));
  paras.push(...summaryPara(topic.summary));
  paras.push(...decisionsSection(topic.decisions));
  if (topic.isSection) {
    paras.push(...sharedUpdatesSection(topic.sharedUpdates));
    paras.push(...overviewSection(topic));
    (topic.subTopics || []).forEach((st, i) => paras.push(...subTopicCard(st, topic.id, i + 1)));
  } else { paras.push(...timelineParas(topic.timeline)); }
  paras.push(topicDivider());
  return paras;
}

// Top sections
function buildMilestones(milestones) {
  if (!milestones || !milestones.length) return [];
  const result = [analysisSectionHeading('Milestones')];
  for (const m of milestones) { const parts = [m.date, m.description, m.comment].filter(Boolean);
    result.push(new Paragraph({ spacing: { before: 20, after: 20 }, indent: { left: 360 }, children: [new TextRun({ text: parts.join('  \u2014  '), font: FONT, size: hp(T.milestoneLine.size), color: hx(T.milestoneLine.color) })] })); }
  result.push(spacer(40, 40)); return result;
}
function buildAbsences(absences) {
  if (!absences || !absences.length) return [];
  const result = [analysisSectionHeading('Absences')];
  for (const a of absences) { const sub = [a.substitute1, a.substitute2Notes].filter(Boolean).join(', ');
    result.push(new Paragraph({ spacing: { before: 20, after: 20 }, indent: { left: 360 }, children: [
      new TextRun({ text: a.who || '\u2014', font: FONT, size: hp(T.absenceName.size), bold: true, color: hx(T.absenceName.color) }),
      new TextRun({ text: '   ' + (a.date || '\u2014') + (sub ? '   Sub: ' + sub : ''), font: FONT, size: hp(T.absenceDetail.size), color: hx(T.absenceDetail.color) }),
    ] })); }
  result.push(spacer(40, 40)); return result;
}

// ═══ ANALYSIS SECTIONS ═══

function buildAnalysis(analysis) {
  if (!analysis) return [];
  const result = [];
  result.push(new Paragraph({ spacing: { before: 400, after: 100 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: hx(C.topicDivider.color), space: 8 } },
    children: [new TextRun({ text: 'Analysis', font: FONT, size: hp(T.documentTitle.size), bold: true, color: hx(T.documentTitle.color) })] }));
  result.push(...buildDiff(analysis.diff));
  result.push(...buildUpcoming(analysis.upcomingActions));
  result.push(...buildRollup(analysis.rollup));
  result.push(...buildActionItems(analysis.actionItems));
  result.push(...buildAuditDecisions(analysis.decisions));
  result.push(...buildRisks(analysis.risks));
  result.push(...buildStale(analysis.staleTopics));
  result.push(...buildOwnerFlips(analysis.ownerHistory));
  result.push(...buildSystemMap(analysis.systemMap));
  result.push(...buildReferences(analysis.references));
  return result;
}

// 10. Meeting diff
function buildDiff(diff) {
  if (!diff) return [];
  const result = [analysisSectionHeading('What changed since ' + (diff.previousDate || 'last run'))];
  if (diff.newTopics && diff.newTopics.length) { result.push(analysisSubHeading('New topics')); diff.newTopics.forEach(t => result.push(analysisBullet(t))); }
  if (diff.statusChanges && diff.statusChanges.length) { result.push(analysisSubHeading('Status changes')); diff.statusChanges.forEach(c => result.push(analysisBullet(c.topicRef + ': ' + c.from + ' \u2192 ' + c.to))); }
  if (diff.newDecisions && diff.newDecisions.length) { result.push(analysisSubHeading('New decisions (' + diff.newDecisions.length + ')')); diff.newDecisions.forEach(d => result.push(analysisBullet(d))); }
  if (diff.newRisks && diff.newRisks.length) { result.push(analysisSubHeading('New risks')); diff.newRisks.forEach(r => result.push(analysisBullet(r, '#A80000'))); }
  if (diff.ownerChanges && diff.ownerChanges.length) { result.push(analysisSubHeading('Owner changes')); diff.ownerChanges.forEach(c => result.push(analysisBullet(c.topicRef + ': ' + c.from + ' \u2192 ' + c.to))); }
  if (diff.newlyStale && diff.newlyStale.length) { result.push(analysisSubHeading('Newly stale')); diff.newlyStale.forEach(s => result.push(analysisBullet(s, '#888888'))); }
  if (diff.newActionItems) result.push(analysisBullet(diff.newActionItems + ' new action items detected'));
  return result;
}

// 4. Upcoming
function buildUpcoming(actions) {
  if (!actions || !actions.length) return [];
  const result = [analysisSectionHeading('Upcoming \u2014 next 7 days')];
  for (const a of actions) {
    result.push(new Paragraph({ spacing: { before: 10, after: 10 }, indent: { left: 360 }, children: [
      new TextRun({ text: (a.dueDate || '') + '  ', font: FONT, size: hp(11), bold: true, color: hx('#333333') }),
      new TextRun({ text: a.description, font: FONT, size: hp(11), color: hx('#333333') }),
      new TextRun({ text: a.owner ? '  (' + a.owner + ')' : '', font: FONT, size: hp(11), color: hx('#666666') }),
      new TextRun({ text: a.topicRef ? '  [' + a.topicRef + ']' : '', font: FONT, size: hp(10), color: hx('#999999') }),
    ] }));
  }
  return result;
}

// 5. Rollup
function buildRollup(rollup) {
  if (!rollup) return [];
  const result = [analysisSectionHeading('Rollup \u2014 ' + (rollup.period || 'weekly'))];
  if (rollup.narrativeSummary) result.push(new Paragraph({ spacing: { before: 20, after: 40 }, indent: { left: 360 }, shading: shading('#F0F0F0'),
    children: [new TextRun({ text: '  ' + rollup.narrativeSummary, font: FONT, size: hp(11), color: hx('#555555') })] }));
  const stats = [];
  if (rollup.totalTopics != null) stats.push(['Total topics', '' + rollup.totalTopics]);
  if (rollup.closedInPeriod != null) stats.push(['Closed in period', '' + rollup.closedInPeriod]);
  if (rollup.openedInPeriod != null) stats.push(['Opened in period', '' + rollup.openedInPeriod]);
  if (rollup.blocked != null) stats.push(['Currently blocked', '' + rollup.blocked]);
  if (rollup.decisionsInPeriod != null) stats.push(['Decisions made', '' + rollup.decisionsInPeriod]);
  if (rollup.activeRisks != null) stats.push(['Active risks', '' + rollup.activeRisks]);
  if (rollup.avgAgeDaysOpenItems != null) stats.push(['Avg age open items', Math.round(rollup.avgAgeDaysOpenItems) + 'd']);
  if (rollup.actionsDueNext7Days != null) stats.push(['Actions due next 7d', '' + rollup.actionsDueNext7Days]);
  for (const [l, v] of stats) result.push(analysisLine(l, v));
  return result;
}

// 8. Action items
function buildActionItems(items) {
  if (!items || !items.length) return [];
  const result = [analysisSectionHeading('Action items (' + items.length + ')')];
  for (const a of items) {
    result.push(new Paragraph({ spacing: { before: 10, after: 10 }, indent: { left: 360 }, children: [
      new TextRun({ text: a.owner ? a.owner + ': ' : '', font: FONT, size: hp(11), bold: true, color: hx('#333333') }),
      new TextRun({ text: a.text, font: FONT, size: hp(11), color: hx('#333333') }),
      new TextRun({ text: a.due ? ' \u2014 due ' + a.due : '', font: FONT, size: hp(11), color: hx('#666666') }),
      new TextRun({ text: a.overdue ? ' [OVERDUE]' : '', font: FONT, size: hp(11), bold: true, color: hx('#A80000') }),
      new TextRun({ text: a.topicRef ? '  [' + a.topicRef + (a.subTopicRef ? '/' + a.subTopicRef : '') + ']' : '', font: FONT, size: hp(10), color: hx('#999999') }),
    ] }));
  }
  return result;
}

// 1. Decisions audit trail
function buildAuditDecisions(decisions) {
  if (!decisions || !decisions.length) return [];
  const result = [analysisSectionHeading('Decisions audit trail (' + decisions.length + ')')];
  for (const d of decisions) {
    result.push(new Paragraph({ spacing: { before: 10, after: 10 }, indent: { left: 360 }, children: [
      new TextRun({ text: d.id + '  ', font: 'Consolas', size: hp(11), bold: true, color: hx(CA.decisionIdColor || '#107C10') }),
      new TextRun({ text: d.text, font: FONT, size: hp(11), color: hx('#333333') }),
      new TextRun({ text: d.date ? '  (' + d.date + ')' : '', font: FONT, size: hp(11), color: hx('#999999'), italics: true }),
      new TextRun({ text: '  [' + d.topicRef + (d.subTopicRef ? '/' + d.subTopicRef : '') + ']', font: FONT, size: hp(10), color: hx('#999999') }),
      new TextRun({ text: d.agreedBy ? '  \u2014 ' + d.agreedBy : '', font: FONT, size: hp(10), color: hx('#666666') }),
    ] }));
  }
  return result;
}

// 3. Risk register
function buildRisks(risks) {
  if (!risks || !risks.length) return [];
  const open = [], closed = [];
  for (const r of risks) { if (r.status === 'Open') open.push(r); else if (r.status === 'Closed') closed.push(r); }
  const result = [analysisSectionHeading('Risk register (' + open.length + ' open, ' + closed.length + ' closed)')];
  for (const r of open) {
    result.push(new Paragraph({ spacing: { before: 15, after: 15 }, indent: { left: 360 }, shading: shading(CA.riskOpenShading || '#FDE7E9'), children: [
      new TextRun({ text: '  ' + r.id + '  ', font: 'Consolas', size: hp(11), bold: true, color: hx('#A80000') }),
      new TextRun({ text: r.description, font: FONT, size: hp(11), color: hx('#333333') }),
      new TextRun({ text: '  [' + r.topicRef + ']', font: FONT, size: hp(10), color: hx('#999999') }),
    ] }));
    result.push(new Paragraph({ spacing: { before: 5, after: 5 }, indent: { left: 720 }, children: [
      new TextRun({ text: 'Trigger: ' + r.trigger, font: FONT, size: hp(10), color: hx('#666666') }),
      new TextRun({ text: r.detectedDate ? '  \u2014 detected ' + r.detectedDate : '', font: FONT, size: hp(10), color: hx('#888888') }),
    ] }));
  }
  if (closed.length) {
    result.push(analysisSubHeading('Closed risks'));
    for (const r of closed) result.push(new Paragraph({ spacing: { before: 10, after: 10 }, indent: { left: 360 }, children: [
      new TextRun({ text: r.id + '  ', font: 'Consolas', size: hp(11), color: hx('#888888') }),
      new TextRun({ text: r.description, font: FONT, size: hp(11), color: hx('#888888') }),
      new TextRun({ text: r.closedDate ? '  \u2014 closed ' + r.closedDate : '', font: FONT, size: hp(10), color: hx('#999999') }),
    ] }));
  }
  return result;
}

// 7. Stale topics
function buildStale(stale) {
  if (!stale || !stale.length) return [];
  const result = [analysisSectionHeading('Stale topics (' + stale.length + ')')];
  for (const s of stale) result.push(new Paragraph({ spacing: { before: 10, after: 10 }, indent: { left: 360 }, children: [
    new TextRun({ text: s.topicTitle || s.topicRef, font: FONT, size: hp(11), bold: true, color: hx('#333333') }),
    new TextRun({ text: '  \u2014 last mentioned ' + (s.lastMentioned || '?') + ' (' + s.gapDays + 'd ago)', font: FONT, size: hp(11), color: hx('#888888') }),
    new TextRun({ text: s.owner ? '  Owner: ' + s.owner : '', font: FONT, size: hp(11), color: hx('#666666') }),
  ] }));
  return result;
}

// 6. Owner flips
function buildOwnerFlips(ownerHistory) {
  if (!ownerHistory || !Object.keys(ownerHistory).length) return [];
  const result = [analysisSectionHeading('Owner flip tracker')];
  for (const [topicId, changes] of Object.entries(ownerHistory)) {
    if (!changes || !changes.length) continue;
    const flagged = changes.length > 2;
    result.push(new Paragraph({ spacing: { before: 15, after: 5 }, shading: flagged ? shading('#FFF4CE') : undefined, children: [
      new TextRun({ text: '  Topic ' + topicId, font: FONT, size: hp(11), bold: true, color: hx('#333333') }),
      new TextRun({ text: '  \u2014 ' + changes.length + ' change' + (changes.length > 1 ? 's' : ''), font: FONT, size: hp(11), color: hx(flagged ? '#7A6400' : '#666666') }),
      new TextRun({ text: flagged ? '  \u26A0 coordination risk' : '', font: FONT, size: hp(11), bold: true, color: hx('#A80000') }),
    ] }));
    for (const c of changes) result.push(new Paragraph({ spacing: { before: 5, after: 5 }, indent: { left: 600 }, children: [
      new TextRun({ text: c.date ? c.date + '  ' : '', font: FONT, size: hp(10), color: hx('#888888') }),
      new TextRun({ text: c.from + ' \u2192 ' + c.to, font: FONT, size: hp(10), color: hx('#555555') }),
    ] }));
  }
  return result;
}

// 9. System map
function buildSystemMap(systemMap) {
  if (!systemMap || !Object.keys(systemMap).length) return [];
  const result = [analysisSectionHeading('System impact map')];
  const sorted = Object.entries(systemMap).sort((a, b) => (b[1].mentions || 0) - (a[1].mentions || 0));
  for (const [sys, data] of sorted) {
    const flagged = data.concentrationRisk;
    result.push(new Paragraph({ spacing: { before: 10, after: 10 }, indent: { left: 360 }, shading: flagged ? shading('#FDE7E9') : undefined, children: [
      new TextRun({ text: '  ' + sys, font: 'Consolas', size: hp(11), bold: true, color: hx(flagged ? '#A80000' : '#333333') }),
      new TextRun({ text: '  \u2014 ' + (data.mentions || 0) + ' mentions across ' + (data.topics || []).length + ' topics', font: FONT, size: hp(11), color: hx('#555555') }),
      new TextRun({ text: flagged ? '  \u26A0 concentration risk' : '', font: FONT, size: hp(11), bold: true, color: hx('#A80000') }),
      new TextRun({ text: '  [' + (data.topics || []).join(', ') + ']', font: FONT, size: hp(10), color: hx('#999999') }),
    ] }));
  }
  return result;
}

// 2. References
function buildReferences(refs) {
  if (!refs || !refs.length) return [];
  const result = [analysisSectionHeading('Reference index (' + refs.length + ')')];
  for (const r of refs) result.push(new Paragraph({ spacing: { before: 10, after: 10 }, indent: { left: 360 }, children: [
    new TextRun({ text: r.ref, font: 'Consolas', size: hp(11), bold: true, color: hx('#0063B1') }),
    new TextRun({ text: r.type ? '  (' + r.type + ')' : '', font: FONT, size: hp(10), color: hx('#666666') }),
    new TextRun({ text: r.context ? '  \u2014 ' + r.context : '', font: FONT, size: hp(11), color: hx('#555555') }),
    new TextRun({ text: '  [' + (r.topicRefs || []).join(', ') + ']', font: FONT, size: hp(10), color: hx('#999999') }),
    new TextRun({ text: r.status ? '  Status: ' + r.status : '', font: FONT, size: hp(10), color: hx('#888888') }),
  ] }));
  return result;
}

// ═══ DOCUMENT ═══
function buildDocument(data) {
  const children = [];
  children.push(new Paragraph({ spacing: { before: 0, after: 40 }, children: [new TextRun({ text: data.client || 'Client', font: FONT, size: hp(T.documentTitle.size), bold: true, color: hx(T.documentTitle.color) })] }));
  children.push(new Paragraph({ spacing: { before: 0, after: 200 }, children: [
    new TextRun({ text: 'Processed: ', font: FONT, size: hp(T.processedDate.size), color: hx(T.processedDate.color) }),
    new TextRun({ text: data.processedDate || new Date().toISOString().split('T')[0], font: FONT, size: hp(T.processedDate.size), color: hx(T.processedDate.color) }),
  ] }));
  children.push(...buildMilestones(data.milestones));
  children.push(...buildAbsences(data.absences));
  for (const topic of (data.topics || [])) children.push(...buildTopic(topic));
  children.push(...buildAnalysis(data.analysis));
  return children;
}

function makeHeader(client) {
  return new Header({ children: [new Paragraph({ spacing: { after: 60 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 3, color: hx(C.topicDivider.color), space: 6 } },
    tabStops: [{ type: TabStopType.RIGHT, position: 9506 }],
    children: [
      new TextRun({ text: 'OPS Meeting Notes', font: FONT, size: hp(10), bold: true, color: hx(T.documentTitle.color) }),
      new TextRun({ text: ' \u2014 ' + (client || ''), font: FONT, size: hp(10), color: hx(T.processedDate.color) }),
    ] })] });
}
function makeFooter() {
  return new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [
    new TextRun({ text: 'Page ', font: FONT, size: hp(9), color: hx(T.processedDate.color) }),
    new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: hp(9), color: hx(T.processedDate.color) }),
  ] })] });
}

async function main() {
  const args = process.argv.slice(2);
  if (!args[0]) { console.error('\nUsage: node templates/process_notes.js <input.json> [output.docx]\n'); process.exit(1); }
  const inputPath = path.resolve(args[0]);
  let data; try { data = JSON.parse(fs.readFileSync(inputPath, 'utf8')); } catch (e) { console.error('Failed to read/parse JSON: ' + e.message); process.exit(1); }
  let outPath;
  if (args[1]) { outPath = path.resolve(args[1]); }
  else { const id = (data.client || 'output').replace(/[^a-zA-Z0-9_-]/g, '_'); const date = (data.processedDate || new Date().toISOString().split('T')[0]).replace(/-/g, ''); outPath = path.join(OUT_DIR, id + '_' + date + '.docx'); }
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  const doc = new Document({
    styles: { default: { document: { run: { font: FONT, size: hp(11), color: hx('#1A1A1A') } } } },
    sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1200, right: 1200, bottom: 1200, left: 1200 } } },
      headers: { default: makeHeader(data.client) }, footers: { default: makeFooter() }, children: buildDocument(data) }],
  });
  const buf = await Packer.toBuffer(doc); fs.writeFileSync(outPath, buf);
  const a = data.analysis || {};
  console.log('\n\u2713 Document generated: ' + outPath);
  console.log('  Client     : ' + (data.client || '(not set)'));
  console.log('  Topics     : ' + (data.topics || []).length);
  console.log('  Decisions  : ' + (a.decisions || []).length);
  console.log('  Risks      : ' + (a.risks || []).filter(r => r.status === 'Open').length + ' open');
  console.log('  Actions    : ' + (a.actionItems || []).length);
  console.log('  References : ' + (a.references || []).length);
}
main().catch(err => { console.error('\nError:', err.message || err); process.exit(1); });

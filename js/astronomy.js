const SYNODIC_MONTH = 29.53058867;

function getSunZodiacSign(month, day) {
    const signs = I18N[currentLang].zodiac;
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return signs[0];
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return signs[1];
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return signs[2];
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return signs[3];
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return signs[4];
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return signs[5];
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return signs[6];
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return signs[7];
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return signs[8];
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return signs[9];
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return signs[10];
    return signs[11];
}

function getMoonData(dateString) {
    const parts = dateString.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);

    const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
    const jd = (date.getTime() / 86400000) + 2440587.5;
    const T = (jd - 2451545.0) / 36525.0;
    const rad = Math.PI / 180;

    let Lp = 218.3164477 + 481267.88123421 * T - 0.0015786 * T * T + (T * T * T) / 538841 - (T * T * T * T) / 65194000;
    let D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T * T + (T * T * T) / 545868 - (T * T * T * T) / 113065000;
    let M = 357.5291092 + 35999.0502909 * T - 0.0001536 * T * T + (T * T * T) / 24490000;
    let Mp = 134.9633964 + 477198.8675055 * T + 0.0087414 * T * T + (T * T * T) / 69699 - (T * T * T * T) / 14712000;
    let F = 93.2720950 + 483202.0175233 * T - 0.0036539 * T * T - (T * T * T) / 3526000 + (T * T * T * T) / 863310000;

    const E = 1 - 0.002516 * T - 0.0000074 * T * T;

    const sigmaL = 
        6.288774 * Math.sin(Mp * rad) +
        1.274027 * Math.sin((2 * D - Mp) * rad) +
        0.658314 * Math.sin(2 * D * rad) +
        0.213618 * Math.sin(2 * Mp * rad) -
        0.185116 * E * Math.sin(M * rad) -
        0.114332 * Math.sin(2 * F * rad) +
        0.058793 * Math.sin((2 * D - 2 * Mp) * rad) +
        0.057066 * E * Math.sin((2 * D - M - Mp) * rad) +
        0.053322 * Math.sin((2 * D + Mp) * rad) +
        0.045758 * E * Math.sin((2 * D - M) * rad) -
        0.040923 * E * Math.sin((M - Mp) * rad) -
        0.034720 * Math.sin(D * rad) -
        0.030383 * E * Math.sin((M + Mp) * rad) +
        0.015327 * Math.sin((2 * D - 2 * F) * rad) -
        0.012528 * Math.sin((Mp + 2 * F) * rad) +
        0.010980 * Math.sin((Mp - 2 * F) * rad);

    let moonLon = (Lp + sigmaL) % 360;
    if (moonLon < 0) moonLon += 360;

    const sunC = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M * rad)
               + (0.019993 - 0.000101 * T) * Math.sin(2 * M * rad)
               + 0.000289 * Math.sin(3 * M * rad);
    const sunMeanLon = (280.46646 + 36000.76983 * T + 0.0003032 * T * T) % 360;
    let sunLon = (sunMeanLon + sunC) % 360;
    if (sunLon < 0) sunLon += 360;

    let elongation = (moonLon - sunLon) % 360;
    if (elongation < 0) elongation += 360;

    const phase = elongation / 360;
    const age = phase * SYNODIC_MONTH;
    const illumination = Math.round(((1 - Math.cos(phase * 2 * Math.PI)) / 2) * 100);

    const signs = I18N[currentLang].zodiac;
    const phases = I18N[currentLang].phases;

    const moonZodiacIndex = Math.floor(moonLon / 30);
    const moonZodiac = signs[moonZodiacIndex];
    const sunZodiac = getSunZodiacSign(month, day);
    const phaseInfo = phases.find(p => phase >= p.min && phase < p.max) || phases[0];

    return {
        dateString,
        formattedDate: `${parts[2]}.${parts[1]}.${parts[0]}`,
        phase,
        age: age.toFixed(1),
        illumination,
        sunZodiac,
        moonZodiac,
        phaseInfo
    };
}

function analyzeMoonCompatibility(m1, m2) {
    const cDict = I18N[currentLang].compat;
    const illumSum = m1.illumination + m2.illumination;
    const fullnessDiff = Math.abs(100 - illumSum);

    const phaseDiff = Math.abs(m1.phase - m2.phase);
    const oppositeDiff = Math.abs(0.5 - phaseDiff);

    let samePhaseDiff = phaseDiff;
    if (samePhaseDiff > 0.5) samePhaseDiff = 1 - samePhaseDiff;

    let score = 70;
    let title = "";
    let desc = "";

    if (fullnessDiff <= 14 && oppositeDiff <= 0.12) {
        score = Math.min(99, Math.round(99 - fullnessDiff * 0.6));
        title = cDict.fullMergeTitle;
        desc = cDict.fullMergeDesc(m1, m2);
    } else if (m1.illumination >= 85 && m2.illumination >= 85) {
        score = 92;
        title = cDict.twoFullTitle;
        desc = cDict.twoFullDesc;
    } else if (m1.illumination <= 15 && m2.illumination <= 15) {
        score = 90;
        title = cDict.twoNewTitle;
        desc = cDict.twoNewDesc;
    } else if (samePhaseDiff <= 0.08) {
        score = Math.round(88 - samePhaseDiff * 40);
        title = cDict.samePhaseTitle;
        desc = cDict.samePhaseDesc(m1);
    } else if (fullnessDiff <= 22) {
        score = Math.round(89 - fullnessDiff * 0.4);
        title = cDict.harmonyTitle;
        desc = cDict.harmonyDesc(m1, m2);
    } else {
        score = Math.max(74, Math.round(84 - fullnessDiff * 0.15));
        title = cDict.contrastTitle;
        desc = cDict.contrastDesc(m1, m2);
    }

    if (m1.moonZodiac.element === m2.moonZodiac.element) {
        score = Math.min(99, score + 3);
        desc += cDict.bonusMoonElement(m1, m2);
    } else if (m1.sunZodiac.element === m2.sunZodiac.element) {
        score = Math.min(99, score + 2);
        desc += cDict.bonusSunElement(m1, m2);
    } else {
        desc += cDict.bonusDiffElement(m1, m2);
    }

    return { score, title, desc };
}
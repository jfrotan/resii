const {
    createReadStream,
    createWriteStream
  } = require('fs')
  const {
    join
  } = require('path')
  const {
    stripIndent,
    source
  } = require('common-tags')
  const latex = require('node-latex')

  // Required to delete the PDF each time we're going to generate it!
  const fs = require('fs')

  function generatePDF(data) {
    if (fs.exists(join(__dirname, 'resume.pdf'))) {
      fs.unlink(join(__dirname, 'resume.pdf'), (err) => {
        if (err) console.log('Could not delete resume.pdf!')
        else console.log('Successfully deleted ./resume.pdf')
      })
    }

    console.log('Attempting to generate PDF')
    const latexDoc = generateLatex(data)
    const output = createWriteStream(join(__dirname, 'resume.pdf'))

    // Create PDF version locally for testing purposes
    latex(latexDoc).pipe(output)

    console.log('Successfully generated PDF!')
  }

  function generateLatex(data) {
    var profile = data.profile
    var educations = data.educations
    var workExperiences = data.workExperiences
    var skills = data.skills
    var projects = data.projects
    var awards = data.awards

    return stripIndent `
        \\documentclass[a4paper]{article}
        \\usepackage{fullpage}
        \\usepackage{amsmath}
        \\usepackage{amssymb}
        \\usepackage{textcomp}
        \\textheight=10in
        \\pagestyle{empty}
        \\raggedright

        ${generateResumeDefinitions()}

        \\begin{document}

            \\vspace*{-40pt}

            ${generateProfileSection(profile)}

            \\vspace*{2mm}

            ${generateEducationSection(educations)}

            \\vspace*{2mm}

            ${generateExperienceSection(workExperiences)}

            ${generateSkillsSection(skills)}

            \\vspace*{2mm}

            ${generateProjectsSection(projects)}

            \\vspace*{2mm}

            ${generateAwardsSection(awards)}

        \\end{document}
      `
}

  function generateProfileSection(profile) {
    if (profile.length === 0) {
      return ''
    }

    // Curly braces are used for when dealing with a JSON object, aka profile
    const { fullName, email, phoneNumber, address, links } = profile

    // Brackets are used when dealing with a Javascript array, aka Object.values(links)
    const [ portfolio = undefined, linkedin = undefined, github = undefined, other = undefined ] = Object.values(links)

    let line1 = fullName ? `{\\Huge \\scshape {${fullName}}}` : ''
    let line2 = ''
    let line3 = ''

    // Did the user enter more than 2 URLs? If so, let's render them appropriately
    if (Object.keys(links).length <= 2) {
      line2 = [address, email, phoneNumber, portfolio, linkedin, github, other]
        .filter(Boolean)
        .join(' $\\cdot$ ')
    }
    else {
      line2 = [address, email, phoneNumber, linkedin]
        .filter(Boolean)
        .join(' $\\cdot$ ')
      line3 = [portfolio, github, other]
        .filter(Boolean)
        .join(' $\\cdot$ ')
    }

    if (line1 && line2) {
      line1 += '\\\\'
      line2 += '\\\\'
    }

    if (line3) {
      line3 += '\\\\'
    }

    return stripIndent `
      %==== Profile ====%
      \\vspace*{-10pt}
      \\begin{center}
        ${line1}
        \\vspace*{2mm}
        ${line2}
        ${line3}
      \\end{center}
    `
  }

  function generateEducationSection(educations) {
    if (educations.length === 0) {
      return ''
    }

    return source`
    %==== Education ====%
    \\header{Education}
      ${educations.map(e => {
        let line1 = ''
        let line2 = ''

        if (e.SchoolName) {
          line1 += `\\textbf{${e.SchoolName}}`
        }

        if (e.SchoolLocation) {
          line1 += `\\hfill ${e.SchoolLocation}`
        }

        if (e.Degree) {
          line2 += e.Degree + ","
        }

        if (e.Major) {
          line2 += e.Degree ? ` ${e.Major}` + "," : `Degree in ${e.Major}` + ","
        }

        if (e.Gpa) {
          line2 += ` \\textit{GPA: ${e.Gpa}}`
        }

        if (e.GraduationDate) {
          const gradLine = `${e.GraduationDate}`

          line2 += line2 ? ` \\hfill ${gradLine}` : gradLine
        }

        if (line1) {
          line1 += '\\\\'
        }

        if (line2) {
          line2 += '\\\\'
        }

        line2.trim()

        return stripIndent`
          ${line1}
          ${line2}
          \\vspace{2mm}
        `
      })}
  `
  }

  function generateExperienceSection(workExperiences) {
    if (workExperiences.length === 0) {
      return ''
    }

    return source`
      %==== Experience ====%
      \\header{Experience}
      \\vspace{1mm}

      ${workExperiences.map(w => {
        let line1 = ''
        let line2 = ''
        let dutyLines = ''

        if (w.CompanyName) {
          line1 += `\\textbf{${w.CompanyName}}`
        }

        if (w.JobLocation) {
          line1 += ` \\hfill ${w.JobLocation}`
        }

        if (w.JobTitle) {
          line2 += `\\textit{${w.JobTitle}}`
        }

        if (w.JobStartDate && w.JobEndDate) {
          line2 += ` \\hfill ${w.JobStartDate} | ${w.JobEndDate}`
        } else if (w.JobStartDate) {
          line2 += ` \\hfill ${w.JobStartDate} | Present`
        } else if (w.JobEndDate) {
          line2 += ` \\hfill ${w.JobEndDate}`
        }

        if (line1) line1 += '\\\\'
        if (line2) line2 += '\\\\'

        if (w.JobDuties) {
          dutyLines = source`
            \\vspace{-1mm}
            \\begin{itemize} \\itemsep 1pt
              ${w.JobDuties.map(d => `\\item ${d.duty}`)}
            \\end{itemize}
          `
        }

        return stripIndent`
          ${line1}
          ${line2}
          ${dutyLines}
        `
      })}
    `
  }

  function generateSkillsSection(skills) {
    if (skills.length === 0) {
      return ''
    }

    return source`
      \\header{Skills}
      \\begin{tabular}{ l l }
        ${skills.map(s => `${s.Name}: & ${s.Description} \\\\`)}
      \\end{tabular}
    `
  }

  function generateProjectsSection(projects) {
    if (projects.length === 0) {
      return ''
    }

    return source`
      \\header{Projects}
      ${projects.map(p => {
        if (Object.keys(p) === 0) {
          return ''
        }

        let line1 = ''
        let line2 = p.Description || ''

        if (p.Name) {
          line1 += `{\\textbf{${p.Name}}`
        }

        if (p.Technologies) {
          line1 += ` - \\sl ${p.Technologies}} `
        }

        if (p.Url) {
          line1 += `\\hfill ${p.Url}`
        }

        if (line1) line1 += '\\\\'
        if (line2) line2 += '\\\\'

        return stripIndent`
          ${line1}
          ${line2}
          \\vspace*{2mm}
        `
      })}
    `
  }

  function generateAwardsSection(awards) {
    if (awards.length === 0) {
      return ''
    }

    return source`
      \\header{Awards}
      ${awards.map(a => {

        let line1 = ''
        let line2 = a.Description || ''

        if (a.Name) {
          line1 += `\\textbf{${a.Name}}`
        }

        if (a.Location) {
          line1 += ` \\hfill ${a.Location}`
        }

        if (a.Date) {
          line2 += ` \\hfill ${a.Date}`
        }

        if (line1) line1 += '\\\\'
        if (line2) line2 += '\\\\'

        return stripIndent`
          ${line1}
          ${line2}
          \\vspace*{2mm}
        `
      })}
    `
  }

  function generateResumeDefinitions() {
    return stripIndent `
      %\\renewcommand{\\encodingdefault}{cg}
      %\\renewcommand{\\rmdefault}{lgrcmr}

      \\def\\bull{\\vrule height 0.8ex width .7ex depth -.1ex }

      % DEFINITIONS FOR RESUME %%%%%%%%%%%%%%%%%%%%%%%

      \\newcommand{\\area} [2] {
          \\vspace*{-9pt}
          \\begin{verse}
              \\textbf{#1}   #2
          \\end{verse}
      }

      \\newcommand{\\lineunder} {
          \\vspace*{-8pt} \\\\
          \\hspace*{-18pt} \\hrulefill \\\\
      }

      \\newcommand{\\header} [1] {
          {\\hspace*{-18pt}\\vspace*{6pt} \\textsc{#1}}
          \\vspace*{-6pt} \\lineunder
      }

      \\newcommand{\\employer} [3] {
          { \\textbf{#1} (#2)\\\\ \\underline{\\textbf{\\emph{#3}}}\\\\  }
      }

      \\newcommand{\\contact} [3] {
          \\vspace*{-10pt}
          \\begin{center}
              {\\Huge \\scshape {#1}}\\\\
              #2 \\\\ #3
          \\end{center}
          \\vspace*{-8pt}
      }

      \\newenvironment{achievements}{
          \\begin{list}
              {$\\bullet$}{\\topsep 0pt \\itemsep -2pt}}{\\vspace*{4pt}
          \\end{list}
      }

      \\newcommand{\\schoolwithcourses} [4] {
          \\textbf{#1} #2 $\\bullet$ #3\\\\
          #4 \\\\
          \\vspace*{5pt}
      }

      \\newcommand{\\school} [4] {
          \\textbf{#1} #2 $\\bullet$ #3\\\\
          #4 \\\\
      }
          % END RESUME DEFINITIONS %%%%%%%%%%%%%%%%%%%%%%%
    `
  }

// Need "exports" to export the function elsewhere
module.exports = {
    generatePDF
}

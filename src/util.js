const { loadSpec } = require('mememe/renderer/parse')
const yaml = require('js-yaml')

export const convertSpecToState = (spec) => {
  const result = {}
  if(spec.background !== undefined) {
    result.backgroundImageURL = spec.background.image
  }
  delete spec.background

  result.width = spec.size.width
  result.height = spec.size.height
  delete spec.size

  result.inputs = []
  for(let key in spec) {
    const val = spec[key]
    if(val.text !== undefined)  {
      const inputObj = {
        key,
        value: val.text,
        color: val.color,
        fontSize: val.font.split(' ').filter(d => d.indexOf('px') > 0)[0].split('px')[0],
        x: val.position.x,
        y: val.position.y
      }
      result.inputs.push(inputObj)
    }
  }

  return result
}

const resolveTemplate = (templateId) => {
  const hubURL = 'http://meme.connek.tk'

  if(templateId.indexOf('/') < 0) {
    templateId = '_/' + templateId
  }

  const req = new XMLHttpRequest()
  req.open('GET', `${hubURL}/${templateId}`, false)
  req.send(null)

  if (req.status === 200) {
    return yaml.safeLoad(req.responseText)
  }
}

export const loadTemplate = (templateId) => {
  return loadSpec(resolveTemplate(templateId), resolveTemplate)
}
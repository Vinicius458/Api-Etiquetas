const pdf = require('html-pdf');
const ejs = require('ejs');

class etiquetas {

  async gerar_html(req, res) {
    //Requisição JSON
    var { nome, dpto, contato, andar, data, hr_chegada, telefone } = req.body;

    var index = 'views/etiqueta.ejs';

    //Renderização do html no ejs
    ejs.renderFile(index, { nome, dpto, contato, data, telefone, hr_chegada, andar }, (err, html) => {
      if (err) {
        return res.status(500).json({ message: "Erro no servidor: " + err });
      }

      //Configuração da formatação do arquivo PDF para impressão. Obs: Não alterar medidas, parâmetros ja calibrado
      const options = {
        height: "55mm",
        width: "103mm"
      }
      
      //Conversão de arquivo HTML para PDF, armazenando no diretório uploads/etiqueta.pdf
      pdf.create(html, options).toFile('uploads/etiqueta.pdf', (error, response) => {
        if (!error) {
          
          //Gerador de númeração para nomeação do arquivo de download. EX: Etiqueta 54356.pdf
          var min = Math.ceil(1);
          var max = Math.floor(899999);
          var numb = Math.floor(Math.random() * (max - min)) + min;

          //Response gerando um arquivo de download
          return res.status(200).download('uploads/etiqueta.pdf', 'Etiqueta ' + numb + '.pdf');
        } else {
          return res.status(401).json({ message: 'Falha ao gerar o PDF' });
        }
      })

    })


  }



}
module.exports = new etiquetas;
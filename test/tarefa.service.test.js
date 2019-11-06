const tarefas = require("../service/tarefa.service")
const Tarefa =require("../models/tarefaModel")

const soma = (a, b) => {
    return a + b
}

describe('funcao de som', () => {
    
    it('soma certa', () => {

        const resut = soma(10, 1)
        expect(resut).toBe(11)
    })

    it('soma errada',()=>{
        const resut = soma(10,3)
        expect(resut).not.toBe(11)
    })

})

describe('teste de cadastro de tarefas',()=>{
    
    it('Tafefa salva com sucesso',async ()=>{
        jest.spyOn(Tarefa,'create').mockResolvedValue({_id:"12321321"})    
        const tarefa = await tarefas.createTarefa('teste','teste','rerer','321321')
        expect(tarefa.status).toBe(200)
    })

    it('Tafefa com error',async ()=>{
        jest.spyOn(Tarefa,'create').mockResolvedValue({_id:"12321321"})
        try{
            const tarefa = await tarefas.createTarefa('teste','teste',undefined,'321321')
            expect(tarefa.status).not.toBe(200)
        }catch(error){
            expect(error.status).toBe(400)
        }    
      
    })

    it('Tafefa com error banco de dados',async ()=>{
        jest.spyOn(Tarefa,'create').mockResolvedValue(Promise.reject({e:"error"}))
        try{
            const tarefa = await tarefas.createTarefa('teste','teste',undefined,'321321')
            expect(tarefa.status).not.toBe(200)
        }catch(error){
            expect(error.status).toBe(400)
        }    
      
    })
})

describe('teste de update tarefa',()=>{
    it('Tarefa Atualizada com Sucesso', async()=>{
        jest.spyOn(Tarefa,"updateOne").mockResolvedValue({_id:"123123"})
        const tarefa = await tarefas.updateTarefa("teste", "teste", "teste", "132131", "132131")
        expect(tarefa.status).toBe(200)
        })    

    it("Tarefa com erro", async()=>{
        jest.spyOn(Tarefa, "updateOne").mockResolvedValue(Promise.reject({e:"error"}))
        try{const tarefa = await tarefas.updateTarefa("teste", "teste", "teste", "132131", "132131")
        expect(tarefa.status).not.toBe(200)}
        catch(error){
            expect(error.status).toBe(400)
        }
    } )

    it('Tarefa com erro', async ()=>{

    })
})

    




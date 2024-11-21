using sdonboarding.Server.Models;

namespace sdonboarding.Server.Mappers
{
    public class CustomerMapper
    {

        public static Customer DtoToEntity(Dtos.CustomerDto customerDto)
        {
            var entity = new Customer
            {
                Id = customerDto.Id,
                Name = customerDto.Name,
                Address = customerDto.Address
               
            };

            return entity;
        }

        public static Dtos.CustomerDto EntityToDto(Customer customer)
        {
            var dto = new Dtos.CustomerDto
            {
                Id = customer.Id,
                Name = customer.Name,
                Address = customer.Address
                
            };

            return dto;
        }






    }
}

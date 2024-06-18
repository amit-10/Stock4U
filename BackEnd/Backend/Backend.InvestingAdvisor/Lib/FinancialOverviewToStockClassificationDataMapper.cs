using Backend.Common.Models.Stocks;
using Backend.InvestingAdvisor.Models;
using Mapster;

namespace Backend.InvestingAdvisor.Lib;

public static class FinancialOverviewToStockClassificationDataMapper
{
    public static TypeAdapterConfig GetMapping()
    {
        var config = TypeAdapterConfig.GlobalSettings;
        config.ForType<FinancialOverview, StockClassificationData>()
            .Map(dest => dest.Beta, src => src.Beta)
            .Map(dest => dest.Roe, src => src.ReturnOnEquityTTM)
            .Map(dest => dest.PeRatio, src => src.PERatio)
            .Map(dest => dest.PbRatio, src => src.PriceToBookRatio)
            .Map(dest => dest.DividendYield, src => src.DividendYield);

        return config;
    }
}
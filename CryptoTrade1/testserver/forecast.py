import pandas as pd
from prophet import Prophet
from prophet.diagnostics import cross_validation, performance_metrics
import json
import sys

print("Starting forecast script")

try:
    # Завантаження даних з JSON файлу
    with open('data.json', 'r') as file:
        data = json.load(file)

    print("Data loaded successfully")
    print("Data content:", data)

    df = pd.DataFrame(data)
    print("Dataframe created successfully")
    print("Dataframe head:\n", df.head())

    # Перевірка наявності необхідних колонок
    if 'ds' not in df.columns or 'y' not in df.columns:
        raise ValueError("Dataframe does not contain required columns 'ds' and 'y'")

    # Видалення часових поясів з дат
    df['ds'] = pd.to_datetime(df['ds']).dt.tz_localize(None)
    df.rename(columns={'y': 'y'}, inplace=True)

    print("Dataframe columns renamed and timezones removed successfully")

    # Створення та тренування моделі
    model = Prophet()
    model.fit(df)

    print("Model trained successfully")

    # Прогнозування на наступні 365 днів
    future = model.make_future_dataframe(periods=365)
    forecast = model.predict(future)

    print("Prediction completed")

    forecast_data = forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail(365)

    # Крос-валідація моделі з меншим горизонтом
    df_cv = cross_validation(model, initial='90 days', period='30 days', horizon='30 days')
    df_p = performance_metrics(df_cv)

    print("Cross-validation and performance metrics completed")
    print("Performance metrics:\n", df_p.head())

    # Вивід прогнозу та оцінки моделі
    result = {
        "forecast": forecast_data.to_dict(orient='records'),
        "performance": df_p.to_dict(orient='records')
    }

    print(json.dumps(result))

except Exception as e:
    print(str(e), file=sys.stderr)
    sys.exit(1)
